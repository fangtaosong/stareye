import csv

import pandas as pd
import string
from flask import Flask, request, render_template, json

from Recommendation import Recommendation
from Recommendation import normalizeRating
from last_news import LastNews
from news_information import NewsInfo
from aside_user import a_user

uu = {}

print("load user watched news")
watched_news = LastNews("./data/rating.csv")

print("load user favorite news")
favorite_news = Recommendation("./data/rating.csv", "./data/newss.csv")
favorite_news1 = a_user("./data/rating.csv", "./data/newss.csv")

print("load news information")
info_news = NewsInfo("./data/newss.csv")

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/admin")
def admin():
    return render_template('admin.html')


@app.route("/user/<user_id>")
def user(user_id):
    return render_template('user.html', user_id=user_id)


@app.route("/login")
def login():
    return render_template('login.html')


@app.route("/api/auth", methods=['GET', 'POST'])
def auth():
    user_id = request.form.get("user_id")
    password = request.form.get("password")
    if str(user_id) == "admin" and str(password) == "xingtong":
        return "admin"
    else:
        with open('data/user.json') as f:
            data = json.load(f)
            for user in data['user_data']:
                print(user)
                if str(user_id) == str(user['user_id']) and str(password) == str(user['password']):
                    return "success" + str(user['user_id'])
            return "登录失败"


@app.route("/api/news/add_news", methods=['POST'])
def addnews():
    news_id = request.form.get("news_id")
    url = request.form.get("url")
    title = request.form.get("title")
    head_img = request.form.get("head_img")
    category = request.form.get("category")
    tag = request.form.get("tag")
    description = request.form.get("description")
    with open("data/newss.csv", "a+") as f:
        csv_write = csv.writer(f)
        data_row = [news_id, url, title, head_img, category, tag, description]
        csv_write.writerow(data_row)
        f.close()
    return render_template('admin.html')


@app.route('/api/recommend/<user_id>', methods=['POST'])
def news_user_like(user_id):
    flag = check_user_id(user_id)  # 判断Id合法性
    last_result = []

    if flag:  # 存在历史记录的客户，基于内容的协同过滤，进行新闻推荐
        last_news_list = watched_news.get_user_watched_news(user_id)
        Re_news_list = favorite_news.get_news_from_list(user_id)
        last_result = pd.DataFrame.to_json(last_news_list)
        re_result = pd.DataFrame.to_json(Re_news_list)
    else:  # 不存在历史记录，根据浏览时间排序给出推荐表
        re_result = pd.DataFrame.to_json(favorite_news1.simple_recom(user_id))

    resp = {
        'user_id': user_id,
        'last_news_list': last_result,
        'Re_news_list': re_result
    }
    return json.dumps(resp)


@app.route('/api/update', methods=['POST'])
def get_data():  # 获取数据
    user_id = request.form.get('user_id')
    news_id = request.form.get('news_id')
    timestamp = request.form.get('timestamp')
    read_time = request.form.get('read_time')
    train = pd.DataFrame([[user_id, news_id, timestamp, read_time]],
                         columns=['userId', 'newsId', 'rating', 'timestamp'])
    # userId,newsId,rating,timestamp
    resp = {}
    train.to_csv('./data/rating.csv', mode='a', header=False, index=None)

    global uu
    if user_id in uu:
        uu[user_id] += 1
    else:
        uu[user_id] = 1

    if uu[user_id] == 5:
        uu[user_id] = 0
        global watched_news, favorite_news, favorite_news1
        watched_news = LastNews("./data/rating.csv")
        favorite_news = Recommendation("./data/rating.csv", "./data/newss.csv")
        favorite_news1 = a_user("./data/rating.csv", "./data/newss.csv")
        resp = news_user_like(user_id)

    return resp


def check_user_id(user_id):
    temp = pd.read_csv('data/rating.csv')
    if int(user_id) in temp['userId'].values:
        return True
    else:
        return False


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
