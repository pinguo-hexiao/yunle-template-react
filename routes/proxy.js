const pixie = require('koa-pixie-proxy');
const Router = require('koa-router');
const _proxy = new Router();
const API_ROOT = require('../config/api.config').API_ROOT;

const proxy = pixie({ host: API_ROOT });

_proxy.all('*', proxy());


module.exports = _proxy;