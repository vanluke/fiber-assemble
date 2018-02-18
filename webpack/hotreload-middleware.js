/* eslint-disable */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
/* eslint-enable */
const webpackconfig = require('./webpack.client.js');

const webpackcompiler = webpack(webpackconfig);

function useWebpackMiddleware(app) {
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
      'errors-only': true,
    },
  }));
  app.use(webpackHotMiddleware(webpackcompiler, {
    log: console.log,
  }));

  return app;
}

module.exports = {
  useWebpackMiddleware,
};
