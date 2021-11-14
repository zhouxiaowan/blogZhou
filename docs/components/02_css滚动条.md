---
title: css滚动条
date: 2021-11-18 12:30:55
lastUpdated: 2021-11-18 12:30:55
---
# css自定义滚动条
说明：只在使用WebKit 引擎的浏览器中适用  
假如给body加自定义滚动条
```html
<body class="section"></body>
```
```css
.section::-webkit-scrollbar{
  width: 10px;
}
.section::-webkit-scrollbar-track{
  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
  border-radius: 10px;
  background: #EDEDED;
}
.section::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
```
从上面的代码中我们可以看出，滚动条包含`track`和`thumb`  
`track`是滚动条的基础，其中的 `thumb`是用户拖动支页面或章节内的滚动。  
我们可以通过添加background、shadows、border-radius和border来对它进行造型。  
