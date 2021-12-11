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
            {text: '博客', link: '/components/01_懒加载.html' },
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
                        '/basic/javascript/10_宏任务和微任务.html',
                    ]
                },
                {
                    title: 'ECMAScript 6',
                    children: [
                        '/basic/es6/01_promise.html',
                        '/basic/es6/02_class.html',
                        '/basic/es6/03_map.html',
                        '/basic/es6/04_set.html',
                        '/basic/es6/05_iterator.html'
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
                {
                    title: '计算机网络',
                    children: [
                        '/computerBasic/computerNetwork/01_计算机网络模型.html',
                        '/computerBasic/computerNetwork/02_传输层协议.html',
                        '/computerBasic/computerNetwork/03_网络层协议.html'
                    ]
                }
            ],
            '/components/': [
                {
                    title: '博客',
                    children: [
                        '/components/01_懒加载.html',
                        '/components/02_css滚动条.html',
                        '/components/03_Nginx.html',
                        '/components/04_抓包工具Charles.html',
                        '/components/05_前端性能优化.html',
                        '/components/06_吸顶效果.html',
                        '/components/07_上传图片.html',
                        '/components/08_vue返回上一页不刷新.html'
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
                        '/advanced/vue3/04_创建vue3和ts项目.html',
                        '/advanced/vue3/05_vue3项目中遇到的错误.html'
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
