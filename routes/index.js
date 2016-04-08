var Router = require('koa-router');
var routes = new Router();


routes
	.get('/', function *() {
		yield this.render('index', {
			title: '21'
		});
	});

module.exports = routes;