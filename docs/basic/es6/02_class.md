---
title: class介绍
date: 2021-11-26 09:19:55
---
# class入门
## 2.1 class介绍
在es6之前生成实例对象的传统方法是通过构造函数。例如
```js
function Point(x,y){
  this.x = x
  this.y = y
}
Point.prototype.toString = function(){
  return '('+this.x+','+this.y+')'
}
var p = new Point(1,2)
```
现在我们再来看一下es6中class的写法
```js
class Point{
  constructor(x,y){
    this.x = x
    this.y = y
  }
  // 注意：方法不用加function关键字，方法与方法之间不用逗号分隔
  toString(){
    return '('+this.x+','+this.y+')'
  }
}
// 在使用的时候也是直接对类使用new命令，跟构造函数
var p = new Point(1,2)
Point.prototype.constructor === Point // true

// 构造函数的prototype属性在class类上依旧存在，事实上类的所有方法都是定义在类的原型上的,在类的实例上调用方法，就是调用原型上的方法
// 上面等同于：
Point.prototype = {
  constructor(){},
  toString(){}
}
```
由于类的方法都是添加在prototype原型对象上面。所以可以使用Object.assign()方法可以方便的向原型上添加多个方法
```js
Object.assign(Point.prototype,{
  toString(){},
  toValue(){},
  ...
})
```
## 2.2 constructor方法介绍 
* constructor方法是类的默认方法，通过new命令生成对象实例，`自动调用该方法`
* 一个类必须有一个constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加  
```js
// 例如
class Point{

}
// 等价于下面
class Point{
  constructor(){

  }
}
```
## 2.3 class类中的this指向

与 ES5 一样，实例的`属性`除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）  
<font color="red">constructor里的this上的属性被添加为实例对象的属性</font>
```js
class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var point = new Point(2, 3);

point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true 
```
类的内部如果含有this，它 __默认指向类的实例__。但是，使用时必须小心，一旦单独使用就可能报错
```js
class Point{
  printName(name='there'){
    this.print(name)
  }
  print(text){
    console.log(text)
  }
}
const point = new Point()
point.printName() // there
const { printName } = point
printName() // TypeError: Cannot read property 'print' of undefined    
// 提取出来后this指向的是运行时环境，（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。
```
<font color="red">this是默认指向class类实例的</font>，如果单独使用该方法，很有可能报错，  
解决方案：
1. 在构造方法中绑定this
```js
class Point{
  constructor(){
    this.printName = this.printName.bind(this)
  }
  printName(name='there'){
    this.print(name)
  }
  print(text){
    console.log(text)
  }
}
```
2. 使用箭头函数
```js
class Obj{
  constructor(){
    this.getThis = ()=>this // 箭头函数内部的this总是指向定义时所在的对象,所以this总是 指向Obj实例
  }
}
const myObj = new Obj()
myObj.getThis() === myObj // true
```
## 2.4 静态方法和静态属性
静态方法：  

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上`static`关键字，那就表示该方法不会被实例继承，而是直接通过类来调用，这被成为‘静态方法’  
如果静态方法包含this关键字，那么这个this指向类，而不是实例对象
```js
class Foo{
  static staticMethods(){
    this.baz() // this指向Foo这个类，而不是foo实例对象
  }
  static baz(){ // 父类的静态方法不能被实例继承，然而可以被子类继承
    console.log('baz')
  }
  baz() { // 父类的非静态方法可以被实例继承
    console.log('非静态方法');
  }
}
Foo.staticMethods() // baz
var foo = new Foo()
foo.staticMethods() // TypeError: foo.staticMethods is not a function 
class Bar extends Foo{
  static classMethods(){
    return super.staticMethods() //super指父类
  }
}
Bar.classMethods() // baz
```
实例属性除了定义在 constructor方法上的this上，也可以定义在类的最顶层，例如：
```js
class Foo {
  constructor() {
    this.count = 0;
  }
}
// 上面等价于
class Foo {
  count = 0
  constructor() {
  }
}
// 这种写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。
```
静态属性：  
静态属性指Class本身的属性，而不是定义在实例对象（this）上的属性。
```js
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1; //静态属性
  constructor() {
    console.log(Foo.prop); // 1
  }
}
```
老的写法容易忽略
## 2.5 Class的继承
Class可以通过`extends`关键字实现继承


## 2.6 es5和es6不同点
1. 类的内部定义的所有方法都是不可枚举的
```js
Object.keys(Point.prototype) // es6 class 中输出：[]
Object.keys(Point.prototype) // es5 中输出：["toString"]
```
2. 类必须使用new调用，调用不能直接使用`Point()`,会报错，需使用`new Point()`
3. 类的属性名可以采用表达式：`let methodName = 'getArea';class Square { [methodName](){} }`
4. 类不存在变量提升，es5中的方法存在函数提升；为什么类不存在提升呢，和class的继承有关，如果父类使用let来定义，子类是class，假如子类提升到当前作用域顶部，而let定义的父类不会提升，那么就会报错







来源 阮一峰《ECMAScript6入门》