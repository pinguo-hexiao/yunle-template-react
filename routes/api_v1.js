const Router = require('koa-router');
const request = require('request');
const APIv1 = new Router();
const API_ROOT = require('../config/api.config').API_ROOT;

function makePromise(opt) {
  return new Promise((resolve) => {
		const fullUrl = (opt.url.indexOf(API_ROOT) === -1) ? API_ROOT + opt.url : opt.url;
		request(fullUrl, (error, response, body) => {
		 	if( !error && response.statusCode === 200 ) {
		 		resolve (body);
			}
		});
  });
}

APIv1.get('/', function *() {
	const req = {};
	const req_list = [
		{
			name: 'list_1',
			url: '/WeChatMass/List'
		},
		{
			name: 'list_3',
			url: '/WeChatMass/List'
		},
		{
			name: 'list_14',
			url: '/WeChatMass/List'
		},
		{
			name: 'list_15',
			url: '/WeChatMass/List'
		},
		{
			name: 'list_2',
			url: '/WeChatAutoReply/Sub'
		}
	];
	for (var i = req_list.length - 1; i >= 0; i--) {
		req[req_list[i].name] =  Promise.resolve(makePromise(req_list[i]));
	}
  const res = yield req;
  this.body = res;
});

module.exports = APIv1;