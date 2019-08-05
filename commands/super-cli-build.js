const chalk = require('chalk');
const exec = require('../util/exec');
const config = require('../config/index');
const resolve = require('../util/resolve');
const env = require('../util/env');

console.log('构建中...');
switch(config.template) {
    case 'vue':
        // 将命令行参数带到build.js
        const [, , ...args] = process.argv;
        exec('node', [resolve('build/build.js'), args.join(' ')]);
        break;
    default: {
        console.log(chalk.red('  不支持的项目类型:', config.template));
        break;
    }
}