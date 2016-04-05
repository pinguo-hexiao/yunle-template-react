var path = require('path')
var webpack = require('webpack');
var config = require('./webpack.dev.client.config.js');
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义函数判断是否是在当前生产环境，这个很重要，一位开发环境和生产环境配置上有一些区别
var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

config.devtool= false;
config.entry = {
  'app': [path.join(__dirname, "..", 'src/client.js')],
  vendor: [
            // 'console-polyfill',
            // 'es5-shim',
            // 'es5-shim/es5-sham',
            // 'es6-promise',
            // 'json3',
            // 'html5shiv',
            // 'html5shiv/dist/html5shiv-printshiv.js',
            'jquery'
        ]
};

config.output= {
  path: path.join(__dirname, '..', 'dist/'),
  filename: 'js/[name].js',
  chunkFilename: "js/[id].js",
  // publicPath: 'http://localhost:8080/'
};

config.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'Immutable': 'Immutable',
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
      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'] },
    ]
  };
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
  new ExtractTextPlugin('/css/[name].css',
    {
      disable: false,
      allChunks: true
    }),
  new UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['$','jQuery','Immutable']
    }
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    // "UE": "UE",
    "Immutable": "Immutable"
  }),
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
    'process.env.NODE_ENV': '"production"'
  }),
  new HtmlWebpackPlugin({
    title: 'React app',
    filename: 'index.ejs',
    template: path.join(__dirname, "..", 'index.html'),
    hash: true,
    minify:{    
      removeComments:true,    
      collapseWhitespace:true 
    }
  })
];

module.exports = config;