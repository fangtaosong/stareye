import pandas as pd
import numpy as np
import tensorflow as tf

tf.compat.v1.disable_v2_behavior()


# 分数的范围为0-5，也就是根据用户在新闻页面的停留时间进行评分，后续可以进行优化
# 对评分取值范围进行缩放
# 定义函数：接受两个参数
def normalizeRating(rating, record):
    m, n = rating.shape  # m新闻数，n用户数
    # 每个用户的评分平均值
    rating_mean = np.zeros((m, 1))  # 所有新闻平均评分初始化为0
    rating_norm = np.zeros((m, n))  # 保存处理之后的数据
    for i in range(m):
        idx = record[i, :] != 0
        rating_mean[i] = np.mean(rating[i, idx])
        rating_norm[i, idx] -= rating_mean[i]
    return rating_norm, rating_mean


class Recommendation:
    def __init__(self, path_1, path_2):
        self.ratings = pd.read_csv(path_1, encoding="gbk")
        self.news_df = pd.read_csv(path_2, encoding="gbk")

    def get_news_from_list(self, id):
        # 添加行号信息
        # 创建两个矩阵
        # 1. 创建新闻评分矩阵rating
        # 2. 创建用户是否浏览过矩阵record：如果浏览过是1，否则为0
        self.news_df['newsRow'] = self.news_df.index
        # 筛选特征
        self.news_df = self.news_df[['newsRow', 'newsId', 'url', 'title', 'head_img', 'category', 'tag', 'description']]

        ratings = pd.merge(self.ratings, self.news_df, on='newsId')

        # 筛选需要用到的特征
        ratings = ratings[['newsRow', 'userId', 'rating']]

        # 1. 创建新闻评分矩阵rating：根据用户的浏览时间
        userNo = ratings['userId'].max() + 1
        newNo = ratings['newsRow'].max() + 1
        # 创建rating矩阵
        rating = np.zeros((newNo, userNo))
        # 创建新闻评分表
        flag = 0  # 记录处理进度
        ratings_df_length = np.shape(ratings)[0]  # ratings_df的样本个数

        # 2. 创建用户是否评分矩阵record：如果已经评分是1，否则为0
        record = rating > 0
        # 因为record中是布尔值组成的矩阵，将其转化为0和1
        record = np.array(record, dtype=int)

        rating_norm, rating_mean = normalizeRating(rating, record)  # 结果提示有全0数据，需处理

        rating_norm = np.nan_to_num(rating_norm)
        rating_mean = np.nan_to_num(rating_mean)

        num_features = 10

        # 初始化新闻内容矩阵X，产生的每个参数都是随机数且正态分布
        X_parameters = tf.Variable(tf.compat.v1.random_normal([newNo, num_features], stddev=0.35))
        # 初始化用户喜好矩阵theta，产生的每个参数都是随机数且正态分布
        Theta_parameters = tf.Variable(tf.compat.v1.random_normal([userNo, num_features], stddev=0.35))
        # 定义代价函数loss：tf.reduce_sum求和，tf.matmul相乘，transpose_b=True转置b项，
        loss = 1 / 2 * tf.reduce_sum(
            ((tf.matmul(X_parameters, Theta_parameters, transpose_b=True) - rating_norm) * record) ** 2) + 1 / 2 * (
                       tf.reduce_sum(X_parameters ** 2) + tf.reduce_sum(
                   Theta_parameters ** 2))  # 后面部分是正则化项，lambda为1，可以调整lambda来观察模型性能变化

        # 创建adam优化器和优化目标
        optimizer = tf.compat.v1.train.AdamOptimizer(0.0001)

        train = optimizer.minimize(loss, var_list=[X_parameters, Theta_parameters])  # 目标：最小化代价函数

        # 由于需要可视化的loss值是标量，所以要用summary中的scalar
        tf.compat.v1.summary.scalar('loss', loss)

        # 将所有summary信息汇总
        summaryMerged = tf.compat.v1.summary.merge_all()

        # 保存信息的路径
        filename = './news_tensorboard'
        # FileWriter用于把信息保存到文件中
        writer = tf.summary.create_file_writer(filename)

        # 创建tensorflow会话
        tf.compat.v1.disable_eager_execution()
        sess = tf.compat.v1.Session()
        init = tf.compat.v1.global_variables_initializer()
        sess.run(init)

        for i in range(10):
            _, news_summary = sess.run([train, summaryMerged])  # 记录每次迭代的loss的变化，每次train训练的结果保存到_中
            writer.flush()  # 训练后保存数据，代价值随着迭代次数i的变化情况

        # 测试不同的num_features的值，通过比较误差，判断哪个num_features的值最合适
        # 使用前面得到的参数，填满新闻评分表

        # 获取当前X和theta
        Current_X_parameters, Current_Theta_parameters = sess.run([X_parameters, Theta_parameters])

        # dot用于矩阵之间的乘法操作
        predicts = np.dot(Current_X_parameters, Current_Theta_parameters.T) + rating_mean

        # 计算预测值与真实值之间的算数平方根作为预测误差
        errors = np.sqrt(np.sum((predicts - rating) ** 2))

        sortedResult = predicts[:, int(id)].argsort()[::-1]

        idx = 0

        # 'newsRow', 'newsId', 'url', 'title', 'head_img', 'category', 'tag', 'description'
        result_1 = [[0] * 20 for _ in range(7)]

        print(self.news_df)
        for i in sortedResult:
            for j in range(0, 7):
                result_1[j][idx] = self.news_df.iloc[i, j+1]
            # print('SCORE：%.2f, ID：%d, url: %s' % (
            #     predicts[i, int(id)], self.news_df.iloc[i, 1], self.news_df.iloc[i, 2]))
            idx += 1
            if idx == 20:
                break
        result = {
            "newsId": result_1[0],
            "url": result_1[1],
            "title": result_1[2],
            "head_img": result_1[3],
            "category": result_1[4],
            "tag": result_1[5],
            "description": result_1[6]
        }

        df = pd.DataFrame(result)
        print(df)
        return df
