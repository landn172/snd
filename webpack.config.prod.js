const config = require('./webpack.config.base.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackConfig = merge(config, {
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [autoprefixer()],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
});

webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = webpackConfig;
