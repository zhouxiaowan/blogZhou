---
title: 抓包工具-Charles
date: 2021-11-21 09:59
---
# 抓包工具-Charles
## 4.1 安装Charles
去官网下载，安装，安装地址https://www.charlesproxy.com/
## 4.2 给Charles打开代理设置
proxy->macOS Proxy
## 4.3 iPhone手机设置
设置----->无线局域网----->配置代理----->手动----->（输入服务器：电脑的ip（电脑和手机需连接同一个网络）；端口：打开Charles->proxy->proxy settings,此时我输入的是8888，那么在端口那也输入8888）->Charles会弹出请求连接的确认菜单。选择“Allow”----->在手机的浏览器中，输入chls.pro/ssl，会弹出安装证书请求，点同意，下载下来----->打开手机设置->通用-关于本机->证书信任设置（打开信任开关）
## 4.4 Charles实战
### 4.4.1 http
当我们配置好之后，请求页面，就可以看抓包结果了，例如：
<img :src="$withBase('/images/zhuabao.png')" alt="http抓包">

### 4.4.2 https
__https打开是乱码__  


<img :src="$withBase('/images/zhuabao2.png')" alt="http抓包">


__那我们如何可以看到内容呢，就需要我们安装SSL证书了__


__step1:__  下载证书
<img :src="$withBase('/images/zhengshu1.png')" alt="https抓包">

__step2:__ 将Charles证书改为始终信任
<img :src="$withBase('/images/zhengshu.png')" alt="https抓包">

证书弄好之后继续配置SSL Proxying 

<img :src="$withBase('/images/zhengshu3.png')" alt="https抓包">
<img :src="$withBase('/images/zhengshu4.png')" alt="https抓包">  

此时，再次请求，发现可以看到请求结果了
<img :src="$withBase('/images/zhengshu5.png')" alt="https抓包">  

### 4.4.3 Charles流量配置
选择Proxy-->Throttle Settings-->勾选上方的Enable Throttling
<img :src="$withBase('/images/xinren1.png')" alt="Charles流量配置">