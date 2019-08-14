import * as fs from 'fs';
import * as deepmerge from 'deepmerge';
import resolveCwd from '../util/resolveCwd';

interface Config {
    /** 模板名称 */
    template: string;
}

const defaultConfig = {
    dev: {
        host: 'localhost',
        port: 6001,
        autoOpenBrowser: false,
    },
    build: {
        publicPath: './',
        assetsRoot: resolveCwd('./dist'),
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

export default deepmerge(defaultConfig, userConfig) as unknown as Config;