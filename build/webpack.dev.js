const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config');
const config = require('../config/index');
const resolve = require('../util/resolve');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: config.dev.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                PUBLISH_ENV: '"local"',
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorPlugin(),
    ]
})
