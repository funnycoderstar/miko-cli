const fs = require('fs');
const deepmerge = require('deepmerge');
const resolveCwd = require('../util/resolveCwd.js');

const defaultConfig = {
    dev: {
        host: 'localhost',
        port: 6001,
        autoOpenBrowser: false,
    },
    build: {
        publicPath: './',
        assetsRoot: path.resolve(__dirname, '../dist'),,
        assetsSubDirectory: '',
    },
}


// 配置文件兼容json和js拓展名
let configFile = '';
if (fs.existsSync(resolveCwd('./suc-config.json'))) {
    configFile = resolveCwd('./suc-config.json');
} else if (fs.existsSync(resolveCwd('./suc-config.js'))) {
    configFile = resolveCwd('./suc-config.js');
}

// 获取用户自定义配置
let userConfig = {};
if (configFile) {
    userConfig = require(configFile);
}

module.exports = deepmerge(defaultConfig, userConfig);