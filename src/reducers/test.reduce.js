import { TEST } from '../constants';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
  test: {
    text: '同步',
    async: '异步'
  }
});
export default createReducer(initialState, {
  [TEST.SAY]: (state, action) => {
    return state.setIn(['test', 'text'], action.data)
  },
  [TEST.ASYNC]: (state, action) => {
    return state.setIn(['test', 'async'], action.data)
  },
  [TEST.SEND_GET_REQUEST]: (state, action) => {
    return state.setIn(['test', 'async'], JSON.stringify(action.response))
  },
  [TEST.SEND_GET_SUCCESS]: (state, action) => {
    return state.setIn(['test', 'async'], JSON.stringify(action.response))
  },
  [TEST.SEND_GET_FAILURE]: (state, action) => {
    return state.setIn(['test', 'async'], JSON.stringify(action.response))
  }
});
