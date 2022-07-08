import string

import pandas as pd


class a_user:
    def __init__(self, path_1, path_2):
        self.temp_1 = pd.read_csv(path_1, encoding="gbk")
        self.temp_2 = pd.read_csv(path_2, encoding="gbk")

    def simple_recom(self, user_id):
        temp = self.temp_1.merge(self.temp_2, on='newsId')
        temp = temp.sort_values(by='rating', ascending=False)
        # newsId,url,title,head_img,category,tag,description
        result = temp[['newsId', 'url', 'title', 'head_img', 'category', 'tag', 'description']].head(20)
        print(result)

        return result
