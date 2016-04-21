var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin'); //把指定文件夹下的文件复制到指定的目录

var config = require('./webpack.base.config');

config.devtool = 'eval-source-map';
config.entry = {
  'app': './src/client.js',
  vendor: [
    // 'console-polyfill',
    // 'es5-shim',
    // 'es5-shim/es5-sham',
    // 'es6-promise',
    // 'json3',
    // 'html5shiv',
    // 'html5shiv/dist/html5shiv-printshiv.js',
    // 'jquery'
  ]
};
config.output= {
  path: path.join(__dirname, '..', 'dist'),
  filename: 'js/[name].[hash].js',
  chunkFilename: 'js/[id].[hash].js'
  // publicPath: 'http://localhost:8080/'
};
config.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'Immutable': 'Immutable'
};
config.module= {
  loaders: [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'es3ify',
  }, {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['add-module-exports']
    }
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }, {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract(
      'css?sourceMap&-minimize!' + 'postcss!' + 'less?sourceMap'
    )
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'css?sourceMap&-minimize!' + 'postcss'
    )
  },
  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=/fonts/[name].[ext]' },
  { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=/fonts/[name].[ext]' },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream&name=/fonts/[name].[ext]' },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&name=/fonts/[name].[ext]' },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml&name=/fonts/[name].[ext]' },
  { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loaders: [
    'url?limit=10000&name=/images/[name].[ext]',
    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'] }
  ]
};
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.[hash].js'),
  new ExtractTextPlugin('css/[name].[hash].css',
    {
      disable: false,
      allChunks: true
    }),
  new UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['$', 'jQuery', 'Immutable']
    }
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'Immutable': 'Immutable'
  }),
  new webpack.DefinePlugin({
    __DEV__: false,
    __PRERELEASE__: true
  }),
  new HtmlWebpackPlugin({
    title: 'React app',
    filename: path.join(__dirname, '..', 'dist', 'index.html'),
    template: path.join(__dirname, '..', 'src', 'index.html'),
    hash: false,
    minify:{
      removeComments:true,
      collapseWhitespace:true
    }
  }),
  new TransferWebpackPlugin([
    {
      from: './src/assets/style/utils',
      to: './dist/css/utils'
    },
    {
      from: './src/assets/images',
      to: './dist/images'
    },
    {
      from: './src/assets/fonts',
      to: './dist/fonts'
    },
    {
      from: './src/utils',
      to: './dist/js/utils'
    }
  ])
];

module.exports = config;
