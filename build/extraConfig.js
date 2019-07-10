const config = require('../config');
const merge = require('webpack-merge');

module.exports = function extraConfig(webpackConfig) {
    if (config.webpackExtraConfig) {
        const configType = typeof config.webpackExtraConfig;
        if (configType === 'function') {
            return config.webpackExtraConfig(webpackConfig);
        } else if (configType === 'object') {
            return merge(webpackConfig, config.webpackExtraConfig);
        }
    }
    return webpackConfig;
};
