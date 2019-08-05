process.env.NODE_ENV = 'production';

// 实现node.js 命令行环境的 loading效果， 和显示各种状态的图标
const ora = require('ora');
// 以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod');
const extraConfig = require('./extraConfig');
const config = require('../config');

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
    if(err) {
        throw err;
    }
    webpack(extraConfig(webpackConfig), (wErr, stats) => {
        spinner.stop();
        if(wErr) {
            throw wErr;
        }
        process.stdout.write(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        })}\n\n`);
        console.log(chalk.cyan(' Build complete.\n'));
        console.log(chalk.yellow(' Tip: built files are meant to be served over an HTTP server.\n  Opening index.html over file:// won\'t work.\n'));
    })
})
