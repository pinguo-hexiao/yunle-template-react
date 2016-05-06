import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import test from './test.reduce';
import g_showMsg from './g_showMsg.reduce';
export default combineReducers({
	routing: routerReducer,
  test,
	g_showMsg
});
