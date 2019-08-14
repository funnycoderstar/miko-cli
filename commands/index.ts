#!/usr/bin/env node
import chalk from 'chalk';
import * as  program from 'commander';
import * as  inquirer from 'inquirer';
import { version } from '../package.json';
import { getLastVersion, installLastest } from '../util/npm';

interface Result {
    shouldUpdate: boolean;
}

const latestVersion = getLastVersion(name);

console.log(chalk.green(`${name} 本地版本 ${version}`));
if (version !== latestVersion) {
    inquirer.prompt([{
        type: 'confirm',
        name: 'shouldUpdate',
        message: `检测到新版本${latestVersion}，是否执行更新？`,
    }]).then((result: Result) => {
        if (result.shouldUpdate) {
            installLastest(name);
            console.log(chalk.green(`\n\n${name} 更新完毕, 请重试 ^_^`));
        } else {
            run();
        }
    });
} else {
    run();
}

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
