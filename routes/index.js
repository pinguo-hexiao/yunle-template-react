var Router = require('koa-router');
var routes = new Router();


routes
	.get('/', function *() {
		this.cookies.set('usertoken', 'test', { signed: true });
		yield this.render('index', {
			htmlWebpackPlugin: {
				options: {}
			}
		});
	});

module.exports = routes;
