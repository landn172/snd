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
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [autoprefixer()],
              },
            },
            'less-loader',
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
});

// hot replace
webpackConfig.entry.unshift('webpack-hot-middleware/client');

const otherPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];
webpackConfig.plugins.push(...otherPlugins);

module.exports = webpackConfig;
