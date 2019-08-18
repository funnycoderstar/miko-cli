#!/usr/bin/env node
const program = require('commander');
const { version, name } = require('../package.json');

run();
function run() {
    program
        .version(version, '-v --version')
        .command('init', '创建项目')
        .command('dev', '启动开发服务')
        .command('build', '构建打包内容')
        .command('publish', '发布新版本')
        .parse(process.argv);
}
