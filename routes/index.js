var Router = require('koa-router');
var routes = new Router();


routes
	.get('/', function *() {
		this.cookies.set('name', 'tobi', { signed: true });
		yield this.render('index', {
			title: '21'
		});
	});

module.exports = routes;