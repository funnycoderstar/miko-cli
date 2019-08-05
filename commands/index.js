#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
const { name, version } = require('../package.json');
const npm = require('../util/npm');

// const latestVersion = npm.getLastVersion(name);
// console.log(chalk.green(`${name} 本地版本 ${version}`));
// if (version !== latestVersion) {
//     inquirer.prompt([{
//         type: 'confirm',
//         name: 'shouldUpdate',
//         message: `检测到新版本${latestVersion}，是否执行更新？`,
//     }]).then((result) => {
//         if (result.shouldUpdate) {
//             npm.installLatest(name);
//             console.log(chalk.green(`\n\n${name} 更新完毕, 请重试 ^_^`));
//         } else {
//             run();
//         }
//     });
// } else {
//     run();
// }

run();
function run() {
    program
        .version(version, '-v --version')
        .command('init [template]', '创建项目')
        .command('dev', '启动开发服务')
        .command('build', '构建打包内容')
        .command('publish', '发布新版本')
        .parse(process.argv);
}
