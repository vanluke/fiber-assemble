/* eslint-disable */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import getPlugins from './config/plugins';
import loaders, {serverCss} from './config/loaders';
/* eslint-enable */

const isServerRendering = process.env.TARGET_ENV === 'server';
const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PROD = ENV === 'production';

const plugins = getPlugins({
  ENV,
  DEV,
  PROD,
  isServer: isServerRendering,
});

const entry = {
  polyfills: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=http://localhost:8765/__webpack_hmr',
    'webpack/hot/dev-server?http://localhost:8765'],
  vendor: ['react',
    'react-dom',
    'react-router',
    'react-router-config',
    'react-router-dom',
    'prop-types',
    'rxjs',
    'styled-components',
    'seamless-immutable',
    'redux0-helpers',
    'redux-observable',
    'redux-logger',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=http://localhost:8765/__webpack_hmr',
  ],
  main: DEV
    ? ['./src/client/render.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:8765/__webpack_hmr',
    ]
    : ['react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:8765/__webpack_hmr',
      './client/client/render.js',
    ],
};


const clientConfig = {
  name: 'client',
  entry,
  devtool: 'inline-source-map',
  output: {
    path: `/`,
    filename: '[name].[hash].js',
    publicPath: 'http://localhost:8765/js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    rules: loaders,
  },

  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
  },

  plugins: [
    ...plugins,
    new webpack.NormalModuleReplacementPlugin(
      /bundles.js/,
      './async-bundles.js',
    ),
  ],
};

module.exports = clientConfig;
