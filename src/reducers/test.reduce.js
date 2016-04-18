import { TEST } from '../constants';
import { createReducer } from 'redux-immutablejs';
import Immutable, { fromJS, Map, List } from 'immutable';

const initialState = fromJS({
  test: {
    text: '同步',
    async: '异步'
  }
});
export default createReducer(initialState, {
  [TEST.SAY]: (state, action) => {
    console.log(action)
    return state.setIn(['test', 'text'], action.data)
  },
  [TEST.ASYNC]: (state, action) => {
    console.log(action)
    return state.setIn(['test', 'async'], action.data)
  }
});