'use strict';

var dev_client = require('./webpack/webpack.dev.client.config.js');
var pro_client = require('./webpack/webpack.prod.config.js');

var config = dev_client;

if( process.env.NODE_ENV === 'production' ){
	config = pro_client;
}

module.exports = config;