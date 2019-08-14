import * as path from 'path';

export default function resolve(...args: string[]) {
    return path.resolve(__dirname, '../', ...args);
};
