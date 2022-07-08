import numpy as np
import pandas as pd


class NewsInfo(object):
    def __init__(self, file_path):
        self.df = pd.read_csv(file_path, encoding="gbk")

    def query_by_ids(self, ids):
        target = pd.DataFrame(list(ids), columns=['newsId'])
        result = pd.merge(right=self.df, left=target)

        return result

    def get_news_url(self,news_id):
        return self.df[self.df["newsId"] == int(news_id)]["url"].iloc[0]
