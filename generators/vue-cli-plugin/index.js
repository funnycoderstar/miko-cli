const path = require('path');
const Generator = require('yeoman-generator');
const spawn = require('cross-spawn');
const toCamelCase = require('camelcase');

const resolveCwd = require('../../util/resolveCwd');
const exec = require('../../util/exec');
const writing = require('../../util/writing');

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
                    message: '请输入插件名称:',
                    default: 'vue-cli-plugin-test',
                },
                {
                    type: 'input',
                    name: 'description',
                    message: '请输入插件描述:',
                    default: 'A vue-cli plugin',
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
            'README.md.ejs',
            'package.json.ejs',
        ], options);
        writing.copy.call(this, [
            'index.js',
            'prompts.js',
            'generator/index.js',
            'generator/template/src/components/example.vue'
        ]);
    }
    end() {
        this.log('项目配置中...');
        spawn.sync('tnpm', ['install']);
        this.log('项目配置完成');
        process.exit(0);
    }
}