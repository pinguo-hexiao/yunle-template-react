var Router = require('koa-router');
var routes = new Router();

routes
	.get('/', function *() {
		this.body= '<h1>front-server-koa</h1>';
	});

module.exports = routes;