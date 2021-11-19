---
title: Nginx快速入门
date: 2021-11-18 12:30:55
lastUpdated: 2021-11-18 12:30:55
---
# Nginx
Nginx和Apache一样都是web服务器；
Apache是一个重量级的
Nginx是一款高性能的HTTP和反向代理的服务器（轻量级），占用内存小，最大支持高达50000并发数
## 3.1 正向代理
先举例一个通俗的例子来说明什么是正向代理：比如我们想访问外国网站，但是我们的浏览器是没有办法访问到的，此时大家都会用一个代理进行访问，比如找到一个可以访问外国网站的代理服务器（VPN），我们将请求发送给代理服务器，然后代理服务器去请求外国网站，然后将返回的数据传递给我们  
`安装在客户端的是正向代理`
## 3.2 反向代理
比如我们请求网关，网关请求服务器，然后将数据传给我们。  
`安装在服务端的是反向代理 ` 
## 3.3 负载均衡
负载均衡就是将原先请求集中在单个服务器上的情况改为请求分发到多个服务器，将负载分发到不同的服务器；（比如a服务器请求权重为2，b服务器请求权重为1，那么有2/3请求发送到a服务器上，有1/3请求发送到b服务器上）
Nginx负载均衡有2种：内置策略和扩展策略  
内置策略为轮询(默认)，加权轮询（加权重）,ip_hash(指定负载均衡器按照基于客户端IP的分配方式，这个方法确保了相同的客户端的请求一直发送到相同的服务器，以保证session会话)
## 3.4 动静分离
在我们的软件开发中，有些请求是需要后台处理的，有些请求是不需要后台处理的（如：css，jpg等），这些不需要经过后台处理的文件成为静态文件(放在部署静态资源服务器上)，其余放在部署动态资源的服务器。通过一定的规则把动静资源区分来，就可以根据静态资源的特点，将它做缓存  
动静分离大体实现方式有两种：  
* 把动态资源和静态资源放到不同的服务器
* 动静资源混合在一起，通过nginx来分开
## 3.5 Nginx实战
### 3.5.1 Nginx下载
下载地址：http://nginx.org/en/download.html
### 3.5.2 Nginx启动
Windows：
下载好Nginx后，进入当前目录，打开cmd
```
nginx.exe
```
打开浏览器，输入localhost:80，看到一个Welcome to nginx!页面，便启动成功了  

Linux：
将下载好的Nginx文件放到服务器上  
```
./configure     // 自动配置
```
```
make // 编译
make install //安装
whereis nginx //看它的位置
cd 位置
cd sbin/
./nginx      //启动
```
常用命令Linux
```
./ngixn -v //查看当前ngixn版本号 windows是nginx -v
./nginx //启动
./nginx -s stop //停止
./nginx -s quit //安全退出
./nginx -s reload //重新加载配置文件
ps aux|grep nginx //查看nginx进程
```
### 3.5.3 nginx配置文件介绍
nginx文件由三部分自称：  
* 第一部分：全局块  
从配置文件开始到events块之前的内容，是全局块，主要会设置一些影响ngixn服务器整体运行的配置指令。比如
```
worker_processes  1; //并发处理的值，值越大，处理的并发数量也越多，但是受到硬件软件等设备的制约
```
* 第二部分：events块  
events块涉及的指令主要影响Nginx服务器与用户的网络的链接，比如：
```
events {
    worker_connections  1024;  //支持的最大连接为1024
}
```
* 第三部分：http块（配置最多的部分）  
http块包括了http全局块和server块  

http全局块  
```shell
include       mime.types;
default_type  application/octet-stream;

#log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
#                  '$status $body_bytes_sent "$http_referer" '
#                  '"$http_user_agent" "$http_x_forwarded_for"';

#access_log  logs/access.log  main;

sendfile        on;
#tcp_nopush     on;

#keepalive_timeout  0;
keepalive_timeout  65;

#gzip  on;
```
server块  
```shell
server {
    listen       8080; //监听的端口是什么
    server_name  localhost; //主机名称

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    //路径
    location / {
        root   html;
        index  index.html index.htm;
        proxy_pass http://localhost:3000;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```
Linux上注意对外访问端口开放  
```
firewall-cmd --list-all //查看对外开放的访问端口
firewall-cmd --add-port=8080/tcp --permanent //加入8080端口
firewall-cmd --reload //重载
```
### 3.5.4 nginx实战
* __Windows__  (windows环境下) 
#### 3.5.3.1 Nginx反向代理实例1 
现在我们开始代理我们的一个前端项目
此时，我启动了一个vue3的项目，访问地址是`http://localhost:3000/#/`(记住你自己的访问地址)  
然后配置nginx （ngixn配置文件是./conf/nginx.conf）,在配置文件中找到server，然后 添加它要代理的服务地址：`proxy_pass http://localhost:3000;`
```
server {
        listen       8080;
        server_name  localhost;
        location / {
            proxy_pass http://localhost:3000;        // 要代理的服务地址
        }
}
```
重启nginx`nginx -s reload`  
此时，你在浏览器中输入http://localhost:8080/#/，   
就可以看到http://localhost:3000页面内容，此时一个简单的ngixn代理就完成了。  
给用户对外暴露的地址是http://localhost:8080/#/，此时用户并不知道真正的服务地址是http://localhost:3000  
#### 3.5.3.2 Nginx反向代理实例2 
实现效果：根据访问路径跳转到不同的端口服务中  
（/vue路径资源请求不到，但是确实代理过去了？？？？？）
```
server {
    listen       8080;
    server_name  localhost;
    location / {
        proxy_pass http://localhost:8081;        // 要代理的服务地址
    }
    location /vue {
        proxy_pass http://localhost:3000;        // 要代理的服务地址
    }
}
```
最简单的测试做法，用webstorm打开两个html页面，a.html和b.html
```
server {
    listen       8080;
    server_name  localhost;
    location / {
        proxy_pass http://localhost:63342/test/a.html?_ijt=l0ag7kseahcm152krt9nc45pho; //替换成你的地址
    }
    location /b {
        proxy_pass http://localhost:63342/test/b.html?_ijt=l0ag7kseahcm152krt9nc45pho; // 替换成你的地址
    }
}
```
location 后面路径的一些解释  
location = /a 表示严格匹配
location ~ /a/ 表示正则表达式，链接中含`/a`,区分大小写
location ~* /a/ 表示正则表达式，链接中含`/a`,不区分大小写
location ^~ /a/ 表示路径是`/a`开头

#### 3.5.3.2 Nginx反向代理实例3 负载均衡

```
//myserver这个自己可以任意命名，但是要和下面的一致
upstream myserver{
    # ip_hash
    server 172.16.1.41:8081 weight=1;
    server 172.16.1.41:8082 weight=2;
}
server {
    listen       8080;
    server_name  localhost;
    location / {
        proxy_pass http://myserver // 和上面名字一致
    }
}
```
然后请求访问localhost://8080 会将请求分担到不同的服务器上，比如这里是分担到8081和8082上

#### 3.5.3.3 Nginx反向代理实例3 动静分离
location / {
    root /image/     // root是加载的静态文件
}
#### 3.5.3.4 配置高可用
当nginx宕机了，那就代理不到了。  
解决办法：用两个nginx服务，主nginx和备用nginx，然后对外提供一个虚拟的ip地址，在两个机器上安装keepalived
<img :src="$withBase('/images/nginxgaokeyong.png')" alt="nginx高可用">
安装好keepalived之后，会生成一个keepalived文件,修改keepalived.conf .....未完待续  
nginx原理：master和worker  
我们请求页面，首先master收到请求，然后将请求发给下面的worker，worker通过争抢的方式来转发请求
