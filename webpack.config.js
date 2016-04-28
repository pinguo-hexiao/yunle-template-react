const dev_client = require('./webpack/webpack.dev.config.js');
const prod_client = require('./webpack/webpack.prod.config.js');

var config = dev_client;
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production'){
	config = prod_client;
}

module.exports = config;
