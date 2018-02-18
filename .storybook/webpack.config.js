/* eslint-disable */
require('babel-register');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../webpack.config.js');
const loaders = require('../config/loaders.js');

module.exports = function(storybookBaseConfig, configType) {
  const rules = [
    ...storybookBaseConfig.module.rules,
    ...config[0].module.rules,
  ];

  return {
    ...storybookBaseConfig,
    resolve: {
      ...storybookBaseConfig.resolve,
      ...config[0].resolve,
    },
    // plugins: [
    //   new ExtractTextPlugin({
    //     filename: '[name].css',
    //     disable: false,
    //     allChunks: true,
    //   }),
    // ],
    // hot: true,
    module: {
      rules,
    },
  }
};
/* eslint-enable */
