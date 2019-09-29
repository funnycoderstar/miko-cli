const path = require('path');
const Generator = require('yeoman-generator');
const spawn = require('cross-spawn');
const toCamelCase = require('camelcase');
const ora = require('ora');
const resolveCwd = require('../../util/resolveCwd');
const exec = require('../../util/exec');
const writing = require('../../util/writing');
const cwd = process.cwd();
        console.log(cwd);
module.exports = class Test extends Generator {
    prompting() {
        const done = this.async();

        const currentPath = resolveCwd('');
        const paths = currentPath.split(path.sep);
        const name = paths[paths.length - 1];
        const gitName = spawn.sync('git', ['config', 'user.name'], { encoding: 'utf-8' }).stdout.trim();
        const gitEmail = spawn.sync('git', ['config', 'user.email'], { encoding: 'utf-8' }).stdout.trim();

        return this.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: '请输入项目名称:',
                    default: 'my-app',
                },
                {
                    type: 'input',
                    name: 'description',
                    message: '请输入项目描述:',
                    default: 'A vue Project',
                },
                {
                    type: 'input',
                    name: 'author',
                    message: '请输入作者名:',
                    default: gitName,
                },
                {
                    type: 'input',
                    name: 'email',
                    message: '请输入邮箱地址:',
                    default: gitEmail,
                },
                {
                    type: 'list',
                    name: 'action',
                    message: `Pick an action:`,
                    choices: [{
                            name: 'npm',
                            value: 'npm'
                        },
                        {
                            name: 'cnpm',
                            value: 'cnpm'
                        },
                        {
                            name: 'yarn',
                            value: 'yarn'
                        }
                    ],
                    default: 'cnpm',
                }
            ]).then((answers) => {
                this.props = answers;
                this.props.name = name;
                done();
        });
    }
    writing() {
        const { name } = this.props;
        let gitlab = '';
        try {
            gitlab = exec.getOutput('git', ['remote', 'get-url', 'origin']);
        } catch (err) {
            console.error('  获取gitlab仓库地址失败');
            this.error = true;
            return;
        }
        const options = Object.assign({
            lowerName: toCamelCase(name),
            camelName: toCamelCase(name, { pascalCase: true }),
            gitlab,
        }, this.props);

        writing.copyTpl.call(this, [
            '.gitignore.ejs',
            '.eslintrc.ejs',
            'suc-config.js.ejs',
            'package.json.ejs',
            'README.md.ejs',
        ], options);
        writing.copy.call(this, [
            'src/index.js',
            'src/app.vue',
        ]);
    }
    end() {
        const { action } = this.props;
        const spinner = ora('⚙  Installing some packages. This might take a while...');
        spinner.start();
        spawn.sync(action, ['install'], { stdio: 'inherit'});
        spinner.stop();
        this.log('项目配置完成');
        process.exit(0);
    }
}
