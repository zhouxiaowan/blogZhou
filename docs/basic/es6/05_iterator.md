---
title: Iterator机制
date: 2021-11-28 09:10:00
---

# Iterator机制（迭代器）
## 5.1 Iterator介绍
Iterator是es6引入的一种新的遍历机制。迭代器有两个核心的概念：
1. 迭代器是一个统一的接口，它的作用是使各种数据结构可被便捷的访问，它是通过一个键为Symbol.iterator的方法来实现
2. 迭代器用于遍历数据结构的元素的指针

迭代过程：
1. 通过Symbol.iterator创建一个迭代器，指向当前数据结构的起始位置
2. 随后通过next方法进行向下迭代指向下一位置，next方法会返回当前位置的对象，对象包含了value和done两个属性，value是当前属性的值，done用于判断是否遍历结束
3. 当done为true时，则遍历结束

例如
```js
const items = ['zero','one','two']
const it = items[Symbol.iterator]();
it.next() // {value:'zero',done:false}
it.next() // {value:'one',done:false}
it.next() // {value:'two',done:false}
it.next() // {value:undefined,done:true}
```

__可迭代的数据结构：array，string，map，set，arguments等等__

`for..of`背后的机制是iterator，所以上面列举的数据结构可用于`for..of`循环，但是普通对象不可以，因为它内部没有迭代器。  
如何给普通对象添加iterator呢？
```js
// 方法1 通过给对象添加Symbol.iterator方法，但不推荐
let o = {
    [Symbol.iterator]:() => ({
        _value:0,
        next(){
            if(this._value === 10){
                return {
                    value:undefined,
                    done:true
                }
            }else{
                return {
                    value:this._value++,
                    done:false
                }
            }
        }
    })
}
```
```js
// 方法二：利用生成器函数Generator
// 任何一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，因此可以把Generator复制给对象的Symbol.iterator接口
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```
iterator应用场合：
* 解构赋值。  
对`数组和set结构`进行结构赋值时会默认调用symbol.iterator方法。
```js
let set = new Set().push('a').push('b').push('c')
let [x,y] = set
x // a
y // b
```
* 扩展运算符  
扩展运算符也会调用默认Iterator接口
```js
let str = 'hello'
[...str] // ['h','e','l','l','o']
let arr = [1,2,3,4]
['a',...arr,'b'] // ['a',1,2,3,4,'b']
```
* yield*
`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
* for..of

生成器函数：
生成器函数的特征：function关键字与函数名之间有一个星号，函数内部使用yield表达式，定义不同的内部状态
```js
function * fn(){
    console.log('a')
    console.log(yield 1)
    console.log('b')
    yield 2
}
var it = fn()
it.next() // a    {value: 1, done: false}
it.next(4) // b   {value: 4, done: false}
it.next() //   {value: undefined, done: true}
```
每次调用next方法遇到yied表达式位置暂停执行；  
如果给next() 方法传递参数，参数的值会代替yied表达时候的返回值；  
如果在生成器中调用return，生成器提前完成

async await  
async 函数是 Generator 函数的语法糖。

