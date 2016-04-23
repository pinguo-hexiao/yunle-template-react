import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import DevTools from './components/DevTools';
import routes from './routes';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

const initialState = __DEV__ ? require('./config/initialState') : (window.__INITIAL_STATE__ || {});
const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

// reduxTools
function isDevTools() {
	if (__DEV__) {
		return <DevTools />;
	}
	return null;
}

export default class Root extends Component{
	constructor(props) {
    super(props);
  }
	render(){
		return (
			<Provider store={store}>
			  <div>
		    	<Router history={history} routes={routes} />
		    	{isDevTools()}
				</div>
			</Provider>
		);
	}
}

render( <Root />, document.getElementById('root'));
