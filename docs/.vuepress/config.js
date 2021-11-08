module.exports = {
    title: 'Zhou\'s blog ',
    description: '我的学习之路',
    head:[
        ['link',{rel:'icon',href:'/images/photo.png'}]
    ],
    themeConfig: {
        nav:[ // 导航栏配置
            {text: '前端基础', link: '/basic/javascript/scope.html' },
            {text: '进阶之路', link: '/advanced/vue3/创建vue3项目.html' },
            {text: '计算机基础', link: '/computerBasic/designPatterns/01_发布订阅模式.html' },
            {text: 'Github', link: 'https://github.com/zhouxiaowan'}
        ],
        sidebar: {
            '/basic/': [
                {
                    title: '前端基础',
                    children: [
                        '/basic/javascript/scope.html',
                        '/basic/javascript/prototype.html',
                        '/basic/javascript/extend.html',
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
            '/advanced/': [
                {
                    title: 'Vue3',
                    children: [
                        '/advanced/vue3/创建vue3项目.html'
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
