var Router = require('koa-router');
var routes = new Router();


routes
	.get('/', function *() {
		this.cookies.set('usertoken', 'test', { signed: true });
		yield this.render('index', {
			htmlWebpackPlugin: {
				options: {}
			},
			__state__: JSON.stringify({test:{},a:123})
		});
	});

module.exports = routes;
