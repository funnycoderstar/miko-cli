import resolve from '../util/resolve';
import { exec } from '../util/exec';


console.log('编译中...');

process.env.NODE_ENV = 'development';
exec('node', resolve('build/dev.js'));


