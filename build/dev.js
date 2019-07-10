process.env.NODE_ENV = 'development';

const open = require('open');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev');
const config = require('../config');
const extraConfig = require('./extraConfig');

const host = process.env.HOST || config.dev.host;
const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;

const app = express();
app.use(express.static(path.resolve(__dirname, 'assets')));
const compiler = webpack(extraConfig(webpackConfig));

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    quiet: true,
    logLevel: 'error',
});
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
});

compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        cb && cb();
    });
});

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);


const uri = `http://${host}:${port}`;

devMiddleware.waitUntilValid(() => {
    console.log(`\n >> Listening at ${uri}\n`);
});

module.exports = app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        open(uri);
    }
});

