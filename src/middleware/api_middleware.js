require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import { API_ROOT } from '../config/apiConf';
import { CALL_API } from '../constants';
// 接口请求
function callApi(endpoint, _method, data, callback) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const options = {
    method: _method || 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(data)
  };
  return fetch(fullUrl, options)
}

export default ({ dispatch,getState }) => next => action => {
	const callAPI = action[CALL_API];
  const state = getState();

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { types, endpoint, method, body, callback } = callAPI;

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint, method, body, callback)
  .then(response =>
     response.json()
     .then(json => ({ json, response }))
  )
  .then(({ json, response }) => {
     if (!response.ok) {
       typeof callback === 'function' ? dispatch(callback('网络异常,请重试')) : null;
       return Promise.reject(json);
     }
     return json;
  })
  .then(
    response => {
      typeof callback === 'function'
      ? dispatch(callback()) : null;
      next(actionWith({
        response,
        body,
        type: successType }));},
    error => {
      typeof callback === 'function' ? dispatch(callback(error.message)) : null;
      next(actionWith({
        type: failureType,
        error: error.message || '网络异常,请重试' }));
    }
  );
}
