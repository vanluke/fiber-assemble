/* eslint-disable */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import loaders, {serverCss} from './config/loaders';
/* eslint-enable */

const serverConfig = {
  name: 'server',
  entry: ['./src/server/index.js'],
  output: {
    path: `${__dirname}/build`,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
  },

  target: 'node',
  module: {
    rules: [...loaders, {...serverCss}],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
  externals: [nodeExternals({
    whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  })],
};

module.exports = serverConfig;
