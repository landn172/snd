const config = require("./webpack.config.base.js");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const {
  resolve
} = require("path");

const webpackConfig = merge(config, {
  module: {
    rules: [{
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 3
      },
      cacheFolder: resolve(".cache"),
      jpegtran: {
        arithmetic: true
      }
    }),
    new ParallelUglifyPlugin({
      cacheDir: ".cache/",
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    })
  ]
});

module.exports = webpackConfig;
