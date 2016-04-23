const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var entry = {};
entry['app'] = [
      'webpack-hot-middleware/client',
      './src/client.js'];

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    path: '/',
    filename: 'main.js',
    chunkFilename: "[id].[chunkhash].js",
    publicPath: 'http://localhost:5000/'
  },
  plugins: [
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
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)?$/,
      exclude: /node_modules/,
      loader: 'es3ify',
    }, {
      test: /(\.jsx|\.js)?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports'],
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: (
        'style!' + 'css?sourceMap&-minimize!' + 'postcss!' + 'less?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: (
        'style!' + 'css?sourceMap&-minimize!' + 'postcss'
      )
    },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100000&minetype=application/font-woff&name=/assets/fonts/[name].[ext]' },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100000&minetype=application/font-woff&name=/assets/fonts/[name].[ext]' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100000&minetype=application/octet-stream&name=/assets/fonts/[name].[ext]' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=assets/fonts/[name].[ext]' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml&name=assets/fonts/[name].[ext]' },
    { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=30000&name=assets/images/[name].[ext]' },
    ]
  }
}
