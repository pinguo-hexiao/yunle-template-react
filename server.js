const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const mount = require('koa-mount');
const serve = require('koa-static');
const app = koa();
const render = require('co-ejs');

app.name = 'front-server-koa';

// 设置默认环境变量
app.env = app.env || 'development';

const isDev = app.env === 'development';
const defaultPort = isDev ? 5000 : 8300;
const port = process.env.PORT || defaultPort;

app.use(serve(path.join(__dirname, 'dist')));

const routes = require('./routes/index');
const APIv1 = require('./routes/api_v1');
const _proxy = require('./routes/proxy');

if (isDev) {
  const config = require('./webpack/webpack.dev.client.config.js');
  const compiler = require('webpack')(config);
  app.use(require('koa-webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  }));
  app.use(require('koa-webpack-hot-middleware')(compiler));
}

app.use(logger());

app.use(render(app, {
  root: isDev ? path.join(__dirname, 'src') : path.join(__dirname, 'dist'),
  layout: 'index',
  viewExt: 'html',
  cache: true,
  debug: false,
}));
app.keys = ['im a newer secret', 'i like turtle'];
app.use(mount('/', routes.middleware()));
app.use(mount('/api/v1', APIv1.middleware()));
app.use(mount('/proxy', _proxy.middleware()));



app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
