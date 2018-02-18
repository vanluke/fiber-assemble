require('babel-core/register');
require('babel-polyfill');

const clientConfig = require('./webpack/webpack.client');
const serverConfig = require('./webpack/webpack.server');

module.exports = [clientConfig, serverConfig];
