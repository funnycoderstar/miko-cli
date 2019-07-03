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

// vue/vue-h5项目, html-webpack-plugin插件默认模板
const defaultTemplate = resolve('build/templates/vue-h5.html');

const jsLoader = {
    loader: require.resolve('babel-loader');
    options: {
        presets: [
            
        ]
    }
}


