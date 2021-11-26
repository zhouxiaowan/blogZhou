---
title: Promise介绍
date: 2021-11-26 09:19:55
---

# Promise详解
## 1.1 Promise介绍
首先Promise简单来说是一个容器，`一旦新建它就会立即执行`，里面保存着未来才会结束的事件（通常是一个异步操作）的结果。  
Promise是异步编程的一种解决方案，比传统的解决方案回调函数更强大  
Promise对象特点：
* Promise对象的<font color="green">状态不受外界影响</font>，Promise对象代表一个异步操作，有三种状态：`pending`（进行中）,`fulfilled`（已成功）,`rejected`（已失败），只有异步操作的结果，可以决定当前是哪一种状态，其它任何操作都无法改变这个状态，也就是<font color="green">状态一旦改变，就不会再变</font>
* 对象状态的改变只有两种：
  1. 从`pending`变成`fulfilled`
  2. 从`pending`变成`rejected`

__Promise基本用法：__
Promise对象是一个构造函数，用来生成Promise实例
```js
const promsie = new Promise(function(resolve,reject){
  // some code 一般表示未来才会结束的事件(异步操作)
  if(/*异步操作成功*/){
    resolve(value)
  }else{
    reject(error)
  }
})
// resolve是从pending->fulfilled(完成),reject是从pending->rejected（失败）
// 当Promise实例生成之后，可以通过then方法分别指定resolved和rejected状态的回调函数
// 如果想在then中获取返回结果，一定要在Promise实例中执行resolve或者reject
promsie.then(function(value){
  // success
  // value 代表成功的值
},function(reject){
  // failure
  // reject代表失败错误信息
})
```
* Promise实例具有then方法，也就是说then方法是定义在Promise原型上的方法，它的作用是Promise实例状态改变之后的回调函数。then方法有两个参数，一个是resolved状态下的回调，一个是rejected状态下的回调，它们都是可选的。  
then方法返回的是一个新的Promise实例,第一个回调函数完成以后，会将返回结果作为参数,所以假如想获取上一个then方法中的结果，一定要return出去  
* catch()方法是then方法`.then(null,function(reject){})``.then(undefined,function(reject){})`的别名,用于指定发生错误时的回调函数。当then方法链式调用时，假如多个then中有多个错误，catch只能捕获第一个错误.  
```js
const promise = new Promise(function(resolve,reject) {
  resolve('success')
})
promise.then(res=>{
  console.log('then1',res);
  // return 'resolved'
  throw new Error('err2')
  throw new Error('err2.1')
}).then(res=>{
  console.log('then2',res)
  throw new Error('err3')
}).catch(err=>{
  console.log('err:',err);
})
// 运行结果：
// then1 success
// err: Error: err2
```
但是当Promise的状态已经变成resolved时，再抛出错误是无效的。例如
```js
const promise = new Promise(function(resolve,reject) {
  resolve('success')
  throw new Error('err') 
})
promise.then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})
// 运行结果：success
```
## 1.2 Promise实现原理

## 1.3 实现一个Promise.all()
