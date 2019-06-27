const path = require('path');

module.exports = function resolve(...args) {
    return path.resolve(__dirname, '../', ...args);
};
