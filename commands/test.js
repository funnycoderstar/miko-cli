var spawn = require('child_process').spawn;
// spawn('/Users/wangyaxing/.nvm/versions/node/v10.16.1/bin/ts-node', [ '/Users/wangyaxing/.nvm/versions/node/v10.16.1/lib/node_modules/ts-node/dist/bin.js',
// '/Users/wangyaxing/temp/super-cli/commands/super-cli-init.ts' ], { stdio: 'inherit', customFds: [0, 1, 2] });

spawn('ts-node', ['/Users/wangyaxing/.nvm/versions/node/v10.16.1/lib/node_modules/ts-node/dist/bin.js', '/Users/wangyaxing/temp/super-cli/commands/super-cli-init.ts'], { stdio: 'inherit',customFds: [0, 1, 2] });