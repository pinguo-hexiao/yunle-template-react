var Router = require('koa-router');
var request = require('request');
var APIv1 = new Router();
var Promise = require("bluebird");
var API_ROOT = require("../config/api.config").API_ROOT;

var req_list = [
	{name: 'list_1', url: '/WeChatMass/List'}, 
	{name: 'list_2', url: '/WeChatAutoReply/Sub'}
];

function makePromise(opt, index) {
  return new Promise((resolve, reject) => {
		var fullUrl = (opt.url.indexOf(API_ROOT) === -1) ? API_ROOT + opt.url : opt.url;
		console.log(fullUrl);
		request(fullUrl, function (error, response, body) {
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