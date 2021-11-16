---
title: 创建一个vue3和typescript的项目
date: 2021-11-18 12:30:55
lastUpdated: 2021-11-18 12:30:55
---

# 创建一个vue3和typescript的项目
## 4.1 使用 
```shell
# npm 6.x
npm init vite@latest <project-name> --template vue
# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue
# 进到所创建的项目文件夹
cd <project-name>
# 安装依赖
npm install
# 启动
npm run dev
# 安装typescript
npm install typescript
# 初始化生成一个tsconfig.json文件
tsc --init
# 将main.js 改为main.ts
# 此时import App from './App.vue'会报错，识别不了vue文件
# 在src目录下新建一个sfc.d.ts文件，sfc.d.ts代码为
declare module "*.vue" {
	import { Component } from "vue";
	const component: Compoent;
	export default component;
}
# 修改tsconfig.json
"lib": ["es2015"] // 里面可以填多个
# 若想要.ts文件实时生成.js文件，需继续修改tsconfig.json文件
"outDir": "./src/js", //js生成目录
"strict": false
# 然后：终端->运行任务->显示所有的任务->监视tsconfig.json
# 安装vue-router
npm install vue-router@4
# 在src下新建router文件夹，里面再新建一个index.ts文件
# 安装vuex
npm install vuex@next
# 在src下新建store文件夹，里面再新建一个index.ts文件
# 然后在main.ts中引入
```