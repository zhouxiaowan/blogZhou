---
title: 组合式API
date: 2021-11-10 09:56:55
lastUpdated: 2021-11-10 09:56:55
---

# 组合式API
## 2.1 什么是组合式API
* 组合式API能够将同一逻辑关注点代码收集在一起
* 在vue组件中,我们使用setup实现组合式API
## 2.2 setup
* setup选项是一个函数,接收props和context参数
* 是一个新的option,所有的组合式API函数都在此使用,只在初始化的时候执行一次(在组件创建之前执行)
* 函数返回的所有的对象中的属性和方法可以直接在其它部分使用(计算属性,方法,生命周期钩子,组件模板)  

setup细节:
* setup中不能使用this,此时this是undefined,因为setup的执行在beforeCreate之前,此时还没生成组件实例
* setup返回值如果有重名,setup优先
* setup不能是async函数,因为如果是async函数的话返回值就不是对象,而是一个promise了,就看不到对象中属性和方法了
* setup返回中的属性会与data函数返回对象中的属性合并为组件对象的属性
* setup返回对象中的方法回和methods中的方法合并成组件中的方法.
## 2.3 ref
ref为我们的值创建了一个响应式引用,一般用来定义一个基本类型的响应式数据,在js中操作数据,需要使用`xxx.value`来访问,模板中直接值用`xxx`
```js
<script>
import { ref } from 'vue'
export default{
  setup(){
    const count = ref(1) // 生成响应式数据,ref对象
    function update(){
      count.value ++ //需加.value来访问
    }
    return {
      count,
      update
    }
  }
}
</script>
```
## 2.3 reactive
* 定义多个数据(对象)的响应式,接受一个普通对象,然后生成该对象的响应式代理器对象
* 响应式是深层的
* 原理是基于Proxy实现
```js
<script>
import { reactive  } from 'vue'
export default{
  setup(){
    const obj = reactive ({
      name:'zxw',
      age:18,
      count:1
    }) // 生成响应式数据对象
    function update(){
      obj.count ++ 
    }
    return {
      obj,
      update
    }
  }
}
</script>
```
## 2.3 watch函数
在setup中也可以使用watch选项  
用法:它接受三个参数
* 一个想要侦听的响应式引用或getter函数
* 一个回调
* 可选的配置项

如果想要监听多个数据,第一个参数可以使用数组来表示,如果是ref对象, 直接指定如果是reactive对象中的属性,  必须通过函数来指定

用法:
```js
import { ref, watch } from 'vue'
export default{
  const counter = ref(0)
  watch(counter, 
  // 回调
  (newValue, oldValue) => {
    console.log('The new counter value is: ' + counter.value)
  },
  // 可选的配置项
  {
    immediate:true, // 初始化立即执行一次,默认为false
    deep:true // 配置深度监视
  })
}
```
监听多个数据
```js
import { ref, watch,reactive } from 'vue'
export default{
  setup(){
    const counter = ref(0)
    const user = reactive({
      firstName:'xw',
      lastName:'z'
    })
    watch([counter,() => user.firstName, () => user.lastName], 
    // 回调
    values => {
      console.log(values) // values是一个数组,里面放着这些数据改变后的值
      console.log('The new counter value is: ' + counter.value)
      console.log('The new user.firstName value is: ' + user.firstName)
    },
    // 可选的配置项
    {
      immediate:true, // 初始化立即执行一次,默认为false
      deep:true // 配置深度监视
    })
  }
}
```
一旦数据发生变化,就会执行回调
## 2.4 computed函数
* 与computed功能基本一致
* 只有getter
* getter和setter

用法:
```js
import { ref, computed,reactive } from 'vue'
export default{
  setup(){
    const user = reactive({
      firstName:'zhou',
      lastName:'xiaowan'
    })
    // getter
    let fullName1 = computed(()=>{
      return user.firstName+'-'+user.lastName
    })
    // getter和setter
    const fullName2 = computed({
      get(){
        return user.firstName+'-'+user.lastName
      },
      set(val:string){
        user.firstName = val.split('-')[0]
        user.lastName = val.split('-')[1]
      }
    })
  }
}

```
## 2.5 在 setup 内注册生命周期钩子
为了使组合式API函数和选项式API一样完整,我们可以在setup内注册生命周期钩子方法.组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on：即 mounted 看起来会像 onMounted。  
这些生命钩子函数接受一个回调,当钩子被组件调用时,执行回调  
用法:
```js
import { ref, onMounted} from 'vue'
export default{
  setup(){
    onMounted(()=>{
      // 接受一个回调
      console.log('onMounted')
    })
  }
}
```
setup内声明周期钩子函数包含:
`onBeforeMount`,`onMounted`,`onBeforeUpdate`,`onUpdated`,`onBeforeUnmount`,`onUnmounted`,`onErrorCaptured`
## 2.6 自定义Hook函数
自定义hook的作用类似于vue2中的mixin技术  
自定义hook的优势:代码清晰易懂  
用法:  
```js
import { ref, onMounted, onUnmounted } from 'vue'
/*
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition() {
  // 初始化坐标数据
  const x = ref(-1)
  const y = ref(-1)

  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })

  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })

  return { x, y }
}
```
```js
<template>
  <div>
    <h2>x: {{ x }}, y: {{ y }}</h2>
  </div>
</template>

<script>
import { ref } from 'vue'
import useMousePosition from './hooks/useMousePosition'

export default {
  setup() {
    const { x, y } = useMousePosition()

    return {
      x,
      y
    }
  }
}
</script>
```



参考:
* http://huaxhe.gitee.io/vue3_study_docs/
* https://v3.cn.vuejs.org/guide/composition-api-introduction.html