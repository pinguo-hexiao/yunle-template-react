import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import test from './test.reduce'
export default combineReducers({
	routing: routerReducer,
  test
});