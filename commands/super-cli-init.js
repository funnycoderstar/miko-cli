const program = require('commander');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const fs = require('fs');
const resolve = require('../util/resolve');

const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入模板:',
        name: 'name',
        default: 'vue'
    }]).then(answers => {
        console.log('模板名为：', answers.name)
        templatePath = resolve(`generators/${answers.name}`);
        console.log('正在初始化项目，请稍等', templatePath);
        spawn.sync(resolve('node_modules/.bin/yo'), [templatePath], { stdio: 'inherit' });
    })
}
initAction();
