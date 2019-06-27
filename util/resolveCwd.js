const path = require('path');

module.exports = function resolveCwd(...args) {
    return path.resolve(process.cwd(), ...args);
};
