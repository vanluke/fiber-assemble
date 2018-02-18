/* eslint-disable */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
/* eslint-enable */

const makeFileLoader = function loader(args) {
  switch (args) {
    case 'woff':
      return {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }],
      };
    case 'ttf':
      return {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        }],
      };
    case 'svg':
      return {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        }],
      };
    case 'eot':
      return {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
        }],
      };
    case 'jpg':
      return {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'hash].[ext]',
          },
        }, {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            optimizationLevel: 7,
            interlaced: false,
          },
        }],
      };
    default:
      return {};
  }
};

export const js = {
  test: /\.js?$/,
  use: [
    'babel-loader', {
      options: {
        babelrc: false,
        presets: [['es2015', {
          modules: false,
        }],
        'env',
        'react',
        'stage-2',
        ],
      },
      loader: 'babel-loader',
    },
  ],
  exclude: [/node_modules/, `${__dirname}/src/client.js`],
};

export const jsSourceMap = {
  test: /\.js$/,
  enforce: 'pre',
  use: [
    'source-map-loader',
  ],
};

export const sass = {
  test: /\.scss/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ]}),
};

export const serverCss = {
  test: /\.scss/,
  use: ExtractTextPlugin.extract({
    fallback: 'isomorphic-style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[hash:base64:10]',
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
      },
    ],
  }),
};

export const json = {
  test: /\.json?$/,
  exclude: /node_modules/,
  use: [
    'json-loader',
  ],
};

export const eslint = {
  test: /\.js?$/,
  enforce: 'pre',
  use: [
    'eslint-loader',
  ],
  include: `${__dirname}/src`,
};

const pug = {
  test: /\.pug$/, use: 'pug-loader',
};

export const svgLoader = makeFileLoader('svg');
export const eotLoader = makeFileLoader('eot');
export const woffLoader = makeFileLoader('woff');
export const ttfLoader = makeFileLoader('ttf');
export const jpgLoader = makeFileLoader('jpg');

export default [jsSourceMap, eslint, js, pug, json, sass,
  svgLoader, eotLoader, woffLoader,
  ttfLoader, jpgLoader];
