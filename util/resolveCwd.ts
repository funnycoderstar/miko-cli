import * as path from 'path';

export default function resolveCwd(...args) {
    return path.resolve(process.cwd(), ...args);
};
