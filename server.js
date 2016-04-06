var path = require("path");
// var favicon = require("serve-favicon");
var koa = require("koa")
		,logger = require("koa-logger")
		,mount = require("koa-mount")
		,router = require("koa-router")
		,serve = require("koa-static")
		,app = koa();
		
app.name = "front-server-koa";

// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || "development";

var isDev = process.env.NODE_ENV === "development";
var defaultPort = isDev ? 5000 : 8300;
var port = process.env.PORT || defaultPort;

app.use(serve(path.join(__dirname, 'dist')));

var APIv1 = require('./router/api_v1');

if (isDev) {
  var config = require("./webpack/webpack.dev.client.config.js");
  var compiler = require("webpack")(config);
  app.use(require("koa-webpack-dev-middleware")(compiler, {
    "noInfo": false,
    "hot":true,
    "inline": true,
    "publicPath": config.output.publicPath,
    "stats": {
      "colors": true
    }
  }));
  app.use(require('koa-webpack-hot-middleware')(compiler));
}

app.use(logger());

app.use(mount('/api/v1', APIv1.middleware()))

// function renderFullPage(renderedContent, initialState) {
//   return (`<!doctype html>
// 					  <html>
// 					    <head>
// 					      <base href="/">
// 					      <meta charset="utf-8">
// 					      <meta name="viewport" content="width=device-width">
// 					      <title>wechat-app for React</title>
// 					      <meta name="description" content="wechat-app use react redux.">
// 					      <meta name="keyword" content="wechat-app react redux react-router react-redux-router immutablejs">
// 					      <link rel="stylesheet" href="/css/style.css"/>
// 					    </head>
// 					    <body class="day-mode">
// 					    <div class="top-box" id="root">${renderedContent}</div>
// 					    <script>
// 					      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
// 					    </script>
// 					    <script type="text/javascript" charset="utf-8" src="/js/bundle.js"></script>
// 					    </body>
// 					 	</html>
//   				`);
// }

// app.use(function *(){
// 	this.body=renderFullPage("测试");
// });


app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
