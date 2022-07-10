# 星瞳网开发文档

## 展示站点

示例站点1：[星瞳网（forimoc.com）](https://forimoc.com/)

实例站点2：[星瞳网（http://39.105.138.249:5000/）](http://39.105.138.249:5000/)


示例微信小程序（预览版）(右上角——>开发调试——>打开调试 否则可能无法浏览新闻)

<img src="http://myimg2.constfrost.com//oi3M25CTa8ftzH1qCojqrBu6LdAc.jpg" width="150">

示例微信小程序（线上版）(先进预览版——>右上角——>开发调试——>打开调试 否则可能无法浏览新闻)

<img src="http://myimg2.constfrost.com//星瞳网.jpg" width="150">



安装前确保5000端口未被占用

#### 安装python3环境

```shell
git clone https://github.com/fangtaosong/stareye.git
cd ./stareye
pip install numpy
pip install pandas
pip install tensorflow
python3 app.py
```

#### 安装mysql服务

```shell
sudo apt-get install mysql-server
# 登入mysql
mysql -uroot -p
use mysql
# 修改密码
set password for 'root'@'localhost' = password('你的密码');
# 或者
grant all privileges on *.* to 'root'@'%' identified by '你的密码' with grant option;
flush privileges;
# 开启远程登录
vim /etc/mysql/mysql.conf.d/mysqld.cnf
# 注释掉bind-address=127.0.0.1这一行，并且最好修改端口(默认为3306)
# 最后重启数据库
service mysql restart
```

如果此方法未能生效

```sql
use mysql;
select user,host,plugin from user;
update user set plugin='mysql_native_password' where host='localhost' and user='root'
update user set authentication_string=password('输入密码'),plugin='mysql_native_password' where user='root';
flush privileges;
service mysql restart
```

