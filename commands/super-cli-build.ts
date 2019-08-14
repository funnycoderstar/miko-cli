import chalk from 'chalk';
import { exec } from '../util/exec';
import config from '../config';
import resolve from '../util/resolve';

console.log('构建中...');


switch(config.template) {
    case 'vue':
        // 将命令行参数带到build.js
        const [, , ...args] = process.argv;
        exec('node', ...[resolve('build/build.js'), args.join(' ')]);
        break;
    default: {
        console.log(chalk.red('  不支持的项目类型:', config.template));
        break;
    }
}