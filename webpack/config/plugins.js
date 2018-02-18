/* eslint-disable */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlPugPlugin from 'html-webpack-pug-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import WebpackPerformOnBuildPlugin from 'simple-webpack-clean-plugin';
import AfterBuild from './stats-plugin';
/* eslint-enable */

export default function ({ENV, DEV, PROD, isServer}) {
  return [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '..'),
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname,
        postcss: [precss, autoprefixer],
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': JSON.stringify(ENV),
      __DEV__: JSON.stringify(DEV),
      __PROD__: JSON.stringify(PROD),
    }),
    new webpack.HotModuleReplacementPlugin(),
    AfterBuild(path.resolve(__dirname, '../..', 'server/metadata/stats.json')),
  ];
}
