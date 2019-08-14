import * as spawn from 'cross-spawn';

export function exec(command: string, args: string[]) {
    try {
        return spawn.sync(command, args, { stdio: 'inherit' });
    } catch (err) {
        console.error(err.message);
        process.exit(-1);
    }
}

export function getOutput (command, args: string[]) {
    const result = spawn.sync(command, args, { encoding: 'utf-8' });
    if (result && result.stdout) {
        return result.stdout.trim();
    }
    return '';
};


