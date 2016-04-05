var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var entry = {};
entry['app'] = [
      'webpack-hot-middleware/client',
      './client.js'
      ];

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

module.exports = {
  devtool: isProduction()?null:'source-map',
  context: path.join(__dirname, "..", "src"),
  entry: entry,
  output: {
    path: path.join(__dirname, "..", 'dist/js/'),
    filename: 'js/bundle.js',
    chunkFilename: "js/[bundle].[chunkhash].js"
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
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)?$/,
        exclude: /node_modules/,
        loader: 'es3ify',
      }, 
      {
        test: /(\.jsx|\.js)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['add-module-exports'],
        }
      }, 
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, 
      {
        test: /\.less$/,
        loader: (
          'style!' + 'css?sourceMap&-minimize!' + 'postcss!' + 'less?sourceMap'
        )
      }, 
      {
        test: /\.css$/,
        loader: (
          'style!' + 'css?sourceMap&-minimize!' + 'postcss'
        )
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100000&minetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100000&minetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100000&minetype=application/octet-stream&name=fonts/[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml&name=fonts/[name].[ext]' },
      { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=30000&name=images/[name].[ext]' }
    ]
  }
};