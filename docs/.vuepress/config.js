module.exports = {
    title: 'zxw\'s blog ',
    description: '我的学习之路',
    head:[
        ['link',{rel:'icon',href:'/images/photo.png'}]
    ],
    themeConfig: {
        nav:[ // 导航栏配置
            {text: '前端基础', link: '/basic/javascript/01_类型.html' },
            {text: '进阶之路', link: '/advanced/vue3/01_创建vue3项目.html' },
            {text: '组件', link: '/components/01_懒加载.html' },
            {text: '计算机基础', link: '/computerBasic/designPatterns/01_发布订阅模式.html' },
            {text: 'Github', link: 'https://github.com/zhouxiaowan'}
        ],
        sidebar: {
            '/basic/': [
                {
                    title: '前端基础',
                    children: [
                        '/basic/javascript/01_类型.html',
                        '/basic/javascript/02_原型.html',
                        '/basic/javascript/03_继承.html',
                        '/basic/javascript/04_作用域.html',
                        '/basic/javascript/05_闭包.html',
                        '/basic/javascript/06_this指向.html',
                        '/basic/javascript/07_内存.html',
                        '/basic/javascript/08_冒泡和捕获.html',
                        '/basic/javascript/09_防抖和节流.html',
                    ]
                },
                {
                    title: 'ECMAScript 6',
                    children: [
                        '/basic/es6/promise.html',
                        '/basic/es6/set.html',
                        '/basic/es6/map.html'
                    ]
                }
            ],
            '/computerBasic/': [
                {
                    title: '设计模式',
                    children: [
                        '/computerBasic/designPatterns/01_发布订阅模式.html',
                        '/computerBasic/designPatterns/02_迭代器模式.html'
                    ]
                },
            ],
            '/components/': [
                {
                    title: '组件',
                    children: [
                        '/components/01_懒加载.html',
                        '/components/02_css滚动条.html'
                    ]
                }
            ],
            '/advanced/': [
                {
                    title: 'Vue3',
                    children: [
                        '/advanced/vue3/01_创建vue3项目.html',
                        '/advanced/vue3/02_组合式API.html',
                        '/advanced/vue3/03_vue2和vue3响应式对比.html',
                        '/advanced/vue3/04_创建vue3和ts项目.html'
                    ]
                },
                {
                    title: 'TypeScript',
                    children: [
                        '/advanced/typescript/01_安装TS.html'
                    ]
                },
                {
                    title: 'NodeJs',
                    children: [
                        '/advanced/node/01_介绍.html'
                    ]
                },
            ]
        }, // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }

}
