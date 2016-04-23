const webpack = require('webpack');
const config = require('./webpack.base.config');

config.entry['app'] = [
      'webpack-hot-middleware/client',
      './src/client.js'
];
config.devtool = 'source-map';
config.output = {
  path: '/',
  filename: 'main.js',
  chunkFilename: "[id].[chunkhash].js",
  publicPath: 'http://localhost:5000/'
};
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
  }),
  new webpack.DefinePlugin({
    __DEV__: true,
    __PRERELEASE__: false
  })
];
module.exports = config;
