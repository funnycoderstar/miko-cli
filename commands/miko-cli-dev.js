const path = require('path');
// const config = require('../config/index');
// const resolve = require('../util/resolve');
const exec = require('../util/exec');

// require('../bin/checkLocalPackages');

console.log('编译中...');

process.env.NODE_ENV = 'development';
exec('node', [path.resolve(__dirname, '../build/dev.js')]);


