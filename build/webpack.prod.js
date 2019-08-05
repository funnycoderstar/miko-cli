// const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.config');
const config = require('../config/index');
const resolveCwd = require('../util/resolveCwd');
const exec = require('../util/exec');
const analyzerConfig = process.argv.some(argv => /analyzer/i.test(argv)) ? 
{
    plugins: [ new BundleAnalyzerPlugin()],
}
:
{};

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: config.build.sourceMap,
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.publicPath,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 利用多进程并行运行提高构建速度
                sourceMap: config.build.sourceMap !== '',
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                PUBLISH_ENV: '"online"',
            }
        }),
    ]
}, analyzerConfig)
