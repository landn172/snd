const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const {
  HappyPack,
  happyThreadPool
} = require('./happypackConfig')


const config = {
  entry: ['./src/preload.js', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: '[name].[hash:7].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.(html|ejs)$/,
        use: [{
          loader: 'html-loader',
          options: {},
        }, ],
      },
      {
        test: /\.(png|jpg|gif|mp4)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        }, ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', 'iOS >= 6', 'Android >= 4.4'],
                },
                useBuiltIns: true,
              },
            ],
          ],
        },
      }]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      },
    }),
    new ExtractTextPlugin({
      filename: 'common.[hash:7].css',
    }),
    new WebpackAssetsManifest()
  ],
};

module.exports = config;
