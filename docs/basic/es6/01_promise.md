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
Promise实现原理还是基于回调函数，只不过是把回调封装在了内部。使用then可以进行链式调用。  
首先我们再来通过一个例子简单看一个Promise的用法
```js
const promise = new Promise(function(resolve,reject){ // ①
  resolve('success') // ④
})
promise.then(res=>{
  console.log(res) // success ④
  return 'ok'
}).then(res=>{
  console.log(res) // ok
  throw new Error('err')
}).catch(err=>{ // ③
  connsole.log(err) // Error:err
})
```
从上面的例子中和上面所说的promise介绍中我们可以得知：
1. Promise构造器中，传入的参数是一个函数。函数的参数也是一个函数。 
2. 调用then方法会返回一个全新的Promise对象
3. catch()方法是then方法`.then(null,function(reject){})`，`.then(undefined,function(reject){})`的别名,用于指定发生错误时的回调函数
4. resolve函数接受一个参数value，是异步操作返回的结果，传给回调函数的参数

学习中....尽快补充
 

## 1.3 实现一个Promise.all()
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
Promise.all([p1,p2,p3])接受一个数组作为参数，p1,p2,p3都是一个Promise实例，如果不是就会调用Promise.resolve方法，将参数转为promise实例。  
注意⚠️：另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。  
`const p = Promise.all([p1,p2,p3])`  
Promise.all特点：  
* 只有p1,p2,p3的状态都变为fulfilled时，p的状态才会变成fulfilled，此时p1,p2,p3的返回值变成一个数组，传递给p的回调参数
* 只要其中任何一个变为reject，p的状态就会变成reject，第一个reject的值会传递给p的回调函数。

```js
Promise.all = function(promises){
  // Promsie.all 返回的是一个新的Promise
  return new Promise((resolve,reject)=>{
    // 判断参数是不是具有iterator接口，如果不具有，抛出错误
    if(typeof promises[Symbol.iterator] !== 'function'){
      return reject(new Error('传入的参数必须具备Iterator 接口'))
    }

    let result = [],counter = 0
    for(let i = 0; i < promises.length;i++){
      Promsie.resolve(promises[i]).then(res=>{
        result[i] = res
        counter++
        if(counter === promises.length){
          resolve(result)
        }
      }).catch(err=>{
        reject(err)
      })
    }
  })
}

```