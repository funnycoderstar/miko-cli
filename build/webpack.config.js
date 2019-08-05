const HtmlWebpackPlugin = require('html-webpack-plugin');
const toCamelCase = require('camelcase');
const { VueLoaderPlugin } = require('vue-loader');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const ScriptExitHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepmerge = require('deepmerge');

const resolve = require('../util/resolve');
const resolveCwd = require('../util/resolveCwd');
const env = require('../util/env');
const projectConfig = require('../config/index');
const config = require('../config/index');

// webpack默认输出目录
const outputPath = resolveCwd('./dist');
// vue/vue-h5项目, html-webpack-plugin插件默认模板
const defaultTemplate = resolve('build/templates/vue-h5.html');


/**
 * javascript loader配置
 * 一定要用require.resolve, 否则会相对命令执行目录来查找包
 */

const jsLoader = {
    loader: require.resolve('babel-loader'),
    options: {
        presets: [
            [
                require.resolve('@babel/preset-env'),
                Object.assign({
                    useBuiltIns: 'usage',
                    modules: false,
                }, config.babelPresetEnvConfig),
            ]

        ],
        babelrc: false,
    }
}

const frameworkConfig = {
    rules: [
        {
            test: /\.vue$/,
            use: [
                {
                    loader: resolve('node_modules/vue-loader/lib/index'),
                    options: {
                        hotReload: config.dev.hotReload === undefined ? true : config.dev.hotReload
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                env.isdev ?  require.resolve('vue-style-loader') : MiniCssExtractPlugin.loader,
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        plugins: [
                            new autoprefixer(),
                        ]
                    }
                },
                require.resolve('less-loader'),
            ]
        },
        {
            test: /\.css$/,
            use: [
                env.isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
                require.resolve('css-loader'),
            ]
        },
        Object.assign({
            test: /\.jsx?$/,
            use: jsLoader,
            exclude: /node_modules/,
        }, config.babelLoaderConfig),
        {
            test: /\.(png|jpe?g|webp)$/,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'images/[name].[hash:6].[ext]',
                    },
                },
            ],
        },
        {
            test: /\.(otf|ttf|woff)$/,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:6].[ext]',
                    },
                },
            ],
        },
    ],
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
}
// webpack公共配置
const webpackConfig = {
    entry: resolveCwd('src/index.js'),
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    resolve: {
        alias: Object.assign({
            vue$: 'vue/dist/vue.js',
        }, config.alias),
    },
    module: {
        rules: [...frameworkConfig.rules]
    },
    plugins: [
        ...frameworkConfig.plugins,
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: resolve('build/templates/vue-h5.html'),
                inject: true
            }
        ),
        new ScriptExitHtmlWebpackPlugin({
            custom: [
                {
                    test: /\.js$/,
                    attributes: 'crossorigin',
                    value: 'anonymous',
                }
            ]
        }),
    ],
    optimization: {
        splitChunks: config.splitChunks || {
            name: 'common',
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                }
            }
        }
    }
    
}
module.exports = webpackConfig;
