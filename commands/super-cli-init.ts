import * as inquirer from 'inquirer';
import * as spawn from 'cross-spawn';
import resolve  from '../util/resolve';

interface Answers {
    /** 模板名称 */
    name: string;
}

const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入模板:',
        name: 'name',
        default: 'vue'
    }]).then((answers: Answers) => {
        console.log('模板名为：', answers.name)
        const templatePath = resolve(`generators/${answers.name}/index.ts`);
        console.log('正在初始化项目，请稍等', templatePath);
        spawn.sync(resolve('node_modules/.bin/yo'), [templatePath], { stdio: 'inherit' });
    })
}
initAction();
