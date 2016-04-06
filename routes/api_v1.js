var Router = require('koa-router');
var request = require('request');
var APIv1 = new Router();
var Promise = require("bluebird");

var req_list = [
	{name: 'list_1', url: 'http://localhost:4000/api/v1/WeChatMass/List'}, 
	{name: 'list_2', url: 'http://localhost:4000/api/v1/WeChatAutoReply/Sub'}
];

function makePromise(opt, index) {
  return new Promise((resolve, reject) => {
  	console.log('正在接求！', opt.url);
		request(opt.url, function (error, response, body) {
		 	if (!error && response.statusCode == 200) {
		 		resolve({[opt.name]: body});
			}
		});
  });
}

APIv1
	.get('/', function *() {
	  this.body = yield new Promise.all( req_list.map(function(item, index){
			return makePromise(item, index);
		}))
			.then(function(res) {
				return res;
			});
	})

module.exports = APIv1;