var path = require('path');
var koa = require('koa')
		,logger = require('koa-logger')
		,mount = require('koa-mount')
		,serve = require('koa-static')
		,app = koa();
var wait = require('co-wait');
var render = require('co-ejs');

app.name = 'front-server-koa';

// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var isDev = process.env.NODE_ENV === 'development';
var defaultPort = isDev ? 5000 : 8300;
var port = process.env.PORT || defaultPort;

app.use(serve(path.join(__dirname, 'dist')));

var routes = require('./routes/index');
var APIv1 = require('./routes/api_v1');

if (isDev) {
  var config = require('./webpack/webpack.dev.client.config.js');
  var compiler = require('webpack')(config);
  app.use(require('koa-webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot:true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(require('koa-webpack-hot-middleware')(compiler));
}

app.use(logger());

app.use(render(app, {
  root: isDev ? path.join(__dirname, 'src') : path.join(__dirname, 'dist'),
  layout: 'index',
  viewExt: 'html',
  cache: true,
  debug: false
}));

app.use(mount('/', routes.middleware()));
app.use(mount('/api/v1', APIv1.middleware()));


app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
