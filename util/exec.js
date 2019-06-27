const spawn = require('cross-spawn');

function exec(command, args) {
    try {
        return spawn.sync(command, args, { stdio: 'inherit' });
    } catch (err) {
        console.error(err.message);
        process.exit(-1);
    }
}

exec.getOutput = function (command, args) {
    const result = spawn.sync(command, args, { encoding: 'utf-8' });
    if (result && result.stdout) {
        return result.stdout.trim();
    }
    return '';
};

module.exports = exec;
