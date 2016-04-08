'use strict';

var dev_client = require('./webpack/webpack.dev.client.config.js');
var prod_client = require('./webpack/webpack.prod.config.js');

var config = dev_client;

if( process.env.NODE_ENV === 'production' ){
	console.log(process.env.NODE_ENV);
	config = prod_client;
}

module.exports = config;