module.exports = {
    title: 'Zhou\'s blog ',
    description: '我的学习之路',
    head:[
        ['link',{rel:'icon',href:'/images/photo.png'}]
    ],
    themeConfig: {
        nav:[ // 导航栏配置
            {text: '前端基础', link: '/basic/1.html' },
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
            ]
        }, // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }

}
