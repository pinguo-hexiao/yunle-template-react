import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reactThunk from 'redux-thunk';
import api_middleware from '../middleware/api_middleware';
const router_middleware = routerMiddleware(hashHistory);

import rootReducer from '../reducers';

let finalCreateStore = compose(
  applyMiddleware(router_middleware),
  applyMiddleware(reactThunk, api_middleware)
);


export default function configureStore(initialState) {
  const store = finalCreateStore(createStore)(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}