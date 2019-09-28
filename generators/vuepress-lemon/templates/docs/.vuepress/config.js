module.exports = {
    title: '木子星兮', 
    description: '木子星兮的博客',
    theme: 'vuepress-theme-lemon',
    head: [
        ['link', { rel: 'icon', href: 'https://cdn.wangyaxing.cn/icon-128x128.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: './icons/icon-152x152.png' }],
        ['meta', { name: 'msapplication-TileImage', content: './icons/icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        logo: 'https://cdn.wangyaxing.cn/newLogoGreen.png',
        // logo: 'https://cdn.wangyaxing.cn/newLogoJian.png',
        lastUpdated: 'Last Updated',
        summary: true,
        nav: [
            { text: '首页', link: '/' },
            { text: '归档', link: '/archives/' },
            { text: '标签', link: '/tags/' },
            { text: '关于', link: '/about/' },
            { 
                text: '更多', 
                items: [
                    {
                        text: '算法',
                        link: 'https://wangyaxing.cn/leetcode/'
                    },
                    {
                        text: '前端总结',
                        link: 'https://wangyaxing.cn/summary/'
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/funnycoderstar'
                    },
                ]
        },
        ],
    },
}