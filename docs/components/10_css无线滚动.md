# css无限滚动
## 10.1 css水平无限滚动
使用css做一个水平无缝衔接的无限滚动效果  
1. 首先复制一组需要循环的图片
2. 然后整体图片左移一组图片的宽度
```html
<div class="container">
  <ul class="content">
    <li class="list">
      <img src="../image/ai-product1.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product2.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product3.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product4.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product5.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product6.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product7.png"/>
    </li>
    <!-- 再复制一组，和上面那一组一摸一样 -->
    <li class="list">
      <img src="../image/ai-product1.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product2.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product3.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product4.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product5.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product6.png"/>
    </li>
    <li class="list">
      <img src="../image/ai-product7.png"/>
    </li>
  </ul>
</div>
```
```css
@keyframes move {
  from {
    transform: translate(0);
  }
  to {
    transform: translate(-1260px);  /* 一组数据的宽度 */
  }
}
.container{
  width: 800px;
  height: 100px;
  overflow: hidden;
  margin-top: 100px;
}
.content{
  width: 2520px; /* 为两组的宽度 */
  height: 100%;
  animation: move 12s linear infinite forwards;
}
.content:after{
  content: '';
  display: block;
  clear: both;
}
.list{
  width: 150px;
  height: 100px;
  margin-right: 30px;
  float: left;
  overflow: hidden;
}
.content:hover{
  animation-play-state:paused;
  -webkit-animation-play-state:paused;
}
img{
  width: 100%;
}
```
## 10.2 css垂直无限滚动
垂直属入上下滚动，和水平同理，先复制出一组数据，然后向上移一组的高度，只是把对宽度的处理变成了高度
```html
<!-- css垂直滑动 -->
  <div class="vertical">
    <div class="vertical-cont">
      <p>今天是个好日子1</p>
      <p>今天是个好日子2</p>
      <p>今天是个好日子3</p>
      <p>今天是个好日子4</p>
      <p>今天是个好日子5</p>
      <p>今天是个好日子1</p>
      <p>今天是个好日子2</p>
      <p>今天是个好日子3</p>
      <p>今天是个好日子4</p>
      <p>今天是个好日子5</p>
    </div>
  </div>
```
```css
.vertical{
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.vertical-cont{
  height: 208px; /* 两组数据的高度度 */
  animation: up 6s linear infinite forwards;
}
.vertical-cont:hover{
  animation-play-state:paused;
  -webkit-animation-play-state:paused;
}
@keyframes up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-104px);  /* 一组数据的高度度 */
  }
}
```
## 10.3 不确定宽高情况下的无线滚动
上面两种方法都是我们能够确定一组要无限滚动的数据的宽或高情况下。那么如果不知道要滚动的数据的宽度或高度呢
