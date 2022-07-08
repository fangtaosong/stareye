import pandas as pd
import numpy as np


class LastNews:
    def __init__(self, fpath):
        self.df = pd.read_csv(fpath, encoding="gbk")

    def get_user_watched_news(self, user_id):
        # 用户看过的新闻ID列表

        print(self.df[self.df["userId"] == int(user_id)]["newsId"])
        return self.df[self.df["userId"] == int(user_id)]["newsId"]
