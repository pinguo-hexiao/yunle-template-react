'use strict';

var path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  ComponentPlugin = require('component-webpack-plugin'),
  TransferWebpackPlugin = require('transfer-webpack-plugin'); //把指定文件夹下的文件复制到指定的目录

var entry = [];
entry['app'] = [
  'webpack-hot-middleware/client',
  './client.js'
];

module.exports = {
  entry: entry,
  output: {
    filename: '[name].js'
  },
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, "..", 'src', 'main', 'assets')
    ],
    modulesDirectories: [
      '../node_modules'
    ]
  },
  plugins: [
    new ComponentPlugin(),
    new ExtractTextPlugin('[name].css'),
    new TransferWebpackPlugin([
      { 
        from: '../src/assets/images', 
        to: '../dist/images'
      }
    ])
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.css$/,
      exclude: /.*\.min.css/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader', 'postcss')
    }, {
      test: /\.png$/,
      loader: 'url-loader?prefix=img/&limit=5000&name=images/[name].[ext]'
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?prefix=img/&limit=5000&name=images/[name].[ext]'
    }, {
      test: /\.gif$/,
      loader: 'url-loader?prefix=img/&limit=5000&name=images/[name].[ext]'
    }, {
      test: /\.woff$/,
      loader: 'url-loader?prefix=font/&limit=5000&name=fonts/[name].[ext]'
    }, {
      test: /\.eot$/,
      loader: 'file-loader?prefix=font/&name=fonts/[name].[ext]'
    }, {
      test: /\.ttf$/,
      loader: 'file-loader?prefix=font/&name=fonts/[name].[ext]'
    }, {
      test: /\.svg$/,
      loader: 'file-loader?prefix=font/&name=fonts/[name].[ext]'
    }]
  }
};