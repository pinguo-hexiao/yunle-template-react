var path = require('path');

module.exports = {
  entry: './src/client.js',
  context: path.join(__dirname, '../'),
  output: {
    path: path.join(__dirname, '..', 'dist/'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[id].js'
  },
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, '..', 'src')
    ],
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)?$/,
      exclude: /node_modules/,
      loader: 'es3ify'
    },
    {
      test: /(\.jsx|\.js)?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports']
      }
    },
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    },
    {
      test: /\.css$/,
      exclude: /.*\.min.css/,
      loader: 'style!css?sourceMap&-minimize!postcss'
    }, {
      test: /\.less$/,
      loader: 'style!css?sourceMap&-minimize!postcss!less?sourceMap'
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
