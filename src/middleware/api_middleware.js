import 'isomorphic-fetch';
import { API_ROOT } from '../config/apiConf';
import { CALL_API } from '../constants';

// 接口请求
function callApi(endpoint, method, body, callback) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  return fetch(fullUrl, {
      	  method: method || 'GET',
      	  headers: {
      		  'Accept': 'application/json',
      		  'Content-Type': 'application/json'
      		},
      	  body: body
      	})
        .then(response =>
          response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        });
}
// 登录是否到期
let isLogin = true;
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
  
  return callApi(endpoint, method, body, callback).then(
    response => {
      // 判断是否登录 || 登录是否到期
      if(response.errcode === 200000 && isLogin ){
        isLogin = false;
      }else if(isLogin ){
        isLogin = true;
        // 回调
        typeof callback === 'function' ? dispatch(callback) : null;
        if(response.errcode === 0){
          next(actionWith({
            response,
            body,
            type: successType
          }));
        }else{
          next(actionWith({
            response,
            body,
            type: failureType
          }));
        }
      }
  	},
    error => next(actionWith({
      type: failureType,
      error: error.message || '网络异常,请重试'
    }))
  )
}