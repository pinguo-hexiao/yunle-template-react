import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import DevTools from './components/DevTools';
import routes from './routes';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

const initialState = require('./config/initialState');


const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);


// reduxTools
function isDevTools() {
	if (process.env.NODE_ENV !== 'production') {
		return <DevTools />;
	}
	return null;
}

export default class Root extends Component{
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
