---
title: this指向
date: 2021-11-18 12:30:55
lastUpdated: 2021-11-18 12:30:55
---

# this指向
## 6.1 this指向
为什么js有this的设计:跟内存里面的数据结构有关  
怎么样判断this指向:
* 普通函数:this指向为函数运行时所在的环境  
* 箭头函数:箭头函数不可以改变this指向(因为箭头函数没有自己的this),所以它捕获的是所定义位置上下文的this,作为自己的this.   

例题:
```js
function f(){
  console.log(this)
}
f() // window,指当前函数的运行环境
const obj = {
  name:'zzz',
  getName:function(){
    console.log(this.name)
  }
}
var name = 'xxx'
obj.getName() // 'zzz' 运行在obj
const m = obj.getName
m() // 'xxx' 运行在window
```
## 6.2 改变this指向
call,apply,bind
### 6.2.1 call原理
call代码实现
```js
// A.call(B,...args)
Function.prototype.call = function(){
  if(typeof this !== 'function'){
      throw new TypeError('error')
  }
  let context = arguments[0] || window // 此时context指B
  context.fn = this // 此时this指的是A，因为.call()的运行时环境是A，把A构造方法赋值给了B的fn上
  let args = [...arguments].slice(1) // call的第一个参数为改变后的this，之后的参数是构造函数A所需的参数
  let result = context.fn(...args) // 为A.call(B,...args)的运行结果
  delete context.fn // 删除B的fn属性
  return result // 返回运行结果
    
}
```
### 6.2.2 apply原理
apply代码实现
```js
Function.prototype.apply = function(){
  if (typeof this !== 'function'){
      throw new TypeError('error')
  }  
  let context = arguments[0] || window // 此时context指B,代表改变后的this指向
  context.fn = this // 此时this指的是A，因为.call()的运行时环境是A，把A构造方法赋值给了B的fn上
  let result = !![arguments]?context.fn(...arguments[1]):context.fn()
  delete context.fn // 删除B的fn属性
  return result // 返回运行结果
}
```
### 6.2.3 bind
bind方法创建一个新的函数,在被调用时,这个新函数的this被指定为bind的第一个参数,而其余参数作为新函数的参数,供调用时使用  
bind返回的是一个原函数的拷贝
### 6.3 测试题
测试题1
```js
function foo(){
  setTimeout(()=>{
    console.log('id',this.id)
  })
}
var id = 1
foo.call({id:42}) // 42
```
测试题2
```js
function foo(){
  // setTimeout 中的this指向window,如果是箭头函数的话,那就是捕获上下文的this指向
  setTimeout(function(){
    console.log('id',this.id)
  })
}
var id = 1
foo.call({id:42}) // 1
```
测试题3:
```js
function foo(){
  return ()=>{
    return ()=>{
      return ()=>{
        console.log('id',this.id) 
      }
    }
  }
}
foo() // this指向window,因为箭头函数不改变this指向,所以捕获的外层foo的this
var f = foo.call({id:1}) // 改变了this指向,指向对象{id:1}
var t1 = f.call({id:2}) // id:1 不改变this指向,因为是箭头函数
var t2 = f().call({id:3}) // id:1
var t1 = f()().call({id:4}) // id:1
```
箭头函数中,call和apply会忽略掉this参数  
测试题4:

