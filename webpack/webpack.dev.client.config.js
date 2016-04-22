var webpack = require('webpack');
var config = require('./webpack.base.config');

config.devtool = 'eval-source-map';
config.entry['app'] =  [
  'webpack-hot-middleware/client',
  './src/client.js'
];
config.output = {
  path: '/',
  filename: '[name].js',
  chunkFilename: '[id].js',
  publicPath : 'http://localhost:3001/'
};
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new webpack.DefinePlugin({
    __DEV__: true,
    __PRERELEASE__: false
  })
];

module.exports = config;
