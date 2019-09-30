const program = require('commander');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const fs = require('fs-extra');
const path = require('path');
const resolve = require('../util/resolve');
const chalk = require('chalk');
const validateProjectName = require('validate-npm-package-name')

generateDir(generateTemplate);

async function generateDir() {
    const projectName = process.argv[2] || '.';
    const cwd = process.cwd();
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.')

    const result = validateProjectName(name)
    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`))
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('Error: ' + err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.error(chalk.red.dim('Warning: ' + warn))
        })
        exit(1)
    }
    if (fs.existsSync(targetDir)) {
        if (inCurrent) {
            const {
                ok
            } = await inquirer.prompt([{
                name: 'ok',
                type: 'confirm',
                message: `Generate project in current directory?`
            }])
            if (!ok) {
                return
            }
        } else {
            const {
                action
            } = await inquirer.prompt([{
                name: 'action',
                type: 'list',
                message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
                choices: [
                    {
                        name: 'Overwrite',
                        value: 'overwrite'
                    },
                    {
                        name: 'Merge',
                        value: 'merge'
                    },
                    {
                        name: 'Cancel',
                        value: false
                    }
                ]
            }])
            if (!action) {
                return
            } else if (action === 'overwrite') {
                console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
                await fs.remove(targetDir);
            }
        }
    }
    await fs.mkdirpSync(targetDir);
    await generateTemplate(targetDir)
}

function generateTemplate(targetDir) {
    const template = process.argv[3];
    if (template === undefined) {
        const templates = fs.readdirSync(resolve('generators'));
        inquirer.prompt([{
            type: 'list',
            choices: templates,
            name: 'template',
            message: 'Please select the project template to be generated',
        }]).then((result) => {
            generate(result.template, targetDir);
        });
    } else {
        generate(template, targetDir);
    }
}

function generate(templateName, targetDir) {
    console.log('current template name：', templateName)
    const templatePath = resolve(`generators/${templateName}`);
    const isExists = fs.existsSync(templatePath);
    if (!isExists) {
        console.log(chalk.red(`不支持模板类型[${templateName}], 请查阅文档后再试`));
        process.exit(-1);
    }
    console.log('正在初始化项目，请稍等', templatePath);
    spawn.sync(resolve('node_modules/.bin/yo'), [templatePath], {
        stdio: 'inherit',
        cwd: targetDir,
    });
}
