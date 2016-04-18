const Router = require('koa-router');
const request = require('request');
const APIv1 = new Router();
const API_ROOT = require('../config/api.config').API_ROOT;
function makePromise(opt) {
  return new Promise((resolve) => {
  	const method = opt.method || 'GET';
		const fullUrl = (opt.url.indexOf(API_ROOT) === -1) ? API_ROOT + opt.url : opt.url;
		new request({
	    method: method,
	    uri: fullUrl
	  },
	  function (error, response, body) {
	    if (error) {
	      return console.error('upload failed:', error);
	    }
	    resolve (body);
	  });
  });
}

APIv1.get('/', function *() {
	const req = {};
	const req_list = [
		{
			name: 'list_1',
			method: 'GET',
			url: '/user'
		},
		{
			name: 'list_2',
			method: 'GET',
			url: '/user/1'
		}
	];
	for (var i = req_list.length - 1; i >= 0; i--) {
		req[req_list[i].name] =  Promise.resolve(makePromise(req_list[i]));
	}
  const res = yield req;
  this.body = res;
});

module.exports = APIv1;