import * as path from 'path';
import * as Generator from 'yeoman-generator';
import * as spawn from 'cross-spawn';
import * as toCamelCase from 'camelcase';

import resolveCwd from '../../util/resolveCwd';

import { getOutput  }from '../../util/exec';
import * as writing from '../../util/writing';

interface TestProps {
    name: string;
}

module.exports = class Test extends Generator {
    private props: TestProps = null;
    private error = false;

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
                }
            ]).then((answers) => {
                this.props = answers as TestProps;
                this.props.name = name;
                done();
        });
    }
    writing() {
        const { name } = this.props;
        let gitlab = '';
        try {
            gitlab = getOutput('git', ['remote', 'get-url', 'origin']);
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
        ], options);
        writing.copy.call(this, [
            'src/index.js',
            'src/app.vue',
        ]);
    }
    end() {
        this.log('项目配置中...');
        spawn.sync('cnpm', ['install']);
        this.log('项目配置完成');
        process.exit(0);
    }
}
