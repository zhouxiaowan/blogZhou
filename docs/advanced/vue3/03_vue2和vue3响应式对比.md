---
title: vue2和vue3响应式
date: 2021-11-10 14:22:55
lastUpdated: 2021-11-10 14:22:55
---
# vue2和vue3响应式原理
## 3.1 vue2响应式原理
* 对象:通过Object.defineProperty()对对象已有属性进行重写和监视
* 数组:通过重写数组的方法来实现对数据修改进行劫持

代码实现:
```js
// vue2响应式原理：在内部通过Object.defineProperty API劫持数据的变化，在数据访问时依赖收集，在数据修改时通知依赖更新
// vue2 缺点：1.初始化阶段递归 2.不能检测对象属性的新增和删除 3.数组改变length是无效的

// 数组方法劫持
let oldArrayPrototype = Array.prototype
let proto = Object.create(oldArrayPrototype)
;['push','pop','shift','unshift','splice','sort','reverse'].forEach(method=>{
    proto[method] = function(){ // 函数劫持，把函数重写，内部继续调用老的方法
        updateView()
        oldArrayPrototype[method].call(this,...arguments)
    }
})


function observe(target){
    console.log(11)
    if(typeof target !== 'object' || target === null){
        return target
    }
    if(Array.isArray(target)){
        target.__proto__ = proto // Object.setPrototypeOf(target,proto)

    }
    for (const key in target) {
        defineReactive(target,key,target[key])
    }
}

function defineReactive(target, key, value) {
    // observe(value) // 递归检测
    Object.defineProperty(target,key,{
        get(){
            observe(value) // 递归检测   自我感觉在get中递归更好。不应该写在Object.defineProperty上面
            return value
        },
        set(newVal){
            if(newVal!==value){
                observe(newVal) // 递归检测
                updateView()
                value = newVal
            }

        }
    })
}

function updateView() {
    console.log("视图更新")
}

let data = {
    name:'zxw',
    study:{
        sports:"running",
        course:"vue"
    },
    likes:['food','sports','flower']
}
observe(data)

// data.name = 'jjk'
// console.log(data.name)
//
data.study.sports='swim'
console.log(data.study.sports)

// data.study = {
//     sports:"running",
//     like:'food',
//     aaaa:'1111',
//
// }
// data.study.sports='swim' // 此时视图不会更新，因为这是新的属性值
// console.log(data.study.sports)

// data.study.like = 'aaaa' // ????????
// console.log(data.study.like)

// data.study.aaa = 'swim' // 此时视图不会更新，因为这是新的属性值
// console.log(data.study.aaa)

// 数组的检测需要对数组上的方法重写
// 但是不能直接Array.prototype.push = ...., 这样就把没被观察的数据也被重写了
// 再创建一个，不覆盖原型上的方法
// data.likes.push("swim")
```
## 3.2 vue3响应式原理
利用Proxy对数据进行代理  
代码实现:
```js
// vue3响应式原理
let toProxy = new WeakMap() // 弱引用映射表，放置的是原对象：代理后的对象
let toRaw = new WeakMap() //被代理过的对象：原对象

function isObject(val){
    return typeof val === 'object' && val !== null
}

function reactive(target){
    return createReactiveObject(target);

}
function createReactiveObject(target){
    if(!isObject(target)){
        return target
    }
    let proxy = toProxy.get(target)
    // 如果一个对象已经被代理了那就返回代理后的结果
    if(proxy){
        return proxy
    }
    // 防止代理过的对象再次被代理
    if(toRaw.has(target)){
        return target
    }

    let handled = {
        // receiver 代理后的对象
        get:function (target,key,receiver){
            // console.log("获取")
            // return target[key]
            // proxy reflect 反射
            let res = Reflect.get(target,key,receiver)
            // 当对象嵌套多层时，递归（多层代理）
            return isObject(res)?reactive(res):res
        },
        set:function (target,key,value,receiver){
            // target[key] = value
            // 好处是有返回值,知道是否设置成功
            let hasOwn = target.hasOwnProperty(key)
            let res = Reflect.set(target,key,value,receiver)
            if(!hasOwn){
                // 新增属性值
                console.log("新增属性值")
            }else if(target[key] !== value){
                // 修改属性值
                console.log("修改属性值")
            }
            return res
        },
        deleteProperty(target, key) {
            console.log("删除")
            let res = Reflect.deleteProperty(target,key)
            return res
        }
    }
    let observed = new Proxy(target,handled)
    toProxy.set(target,observed)
    toRaw.set(observed,target)
    return observed
}
let proxy = reactive({name:'zxw',likes:['swim','running'],sports:{m:2,n:1}})

// proxy.sports.m = 3  // 为什么这里只获取了一次，不是两次（从值中取出sports一次，然后进行赋值操作，所以只打印'获取'一次）

proxy.likes.push('2')
```
