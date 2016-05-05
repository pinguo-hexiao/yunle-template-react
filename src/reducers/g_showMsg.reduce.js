import { G_SHOWMSG } from '../constants';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
  type: '',
  content: '',
  title: ''
})

export default createReducer(initialState, {
  [G_SHOWMSG.G_SHOWMSG]: (state, action) => {
    return state.merge({
      type: action.data.type,
      content: action.data.content,
      title: action.data.title
    })
  },
  [G_SHOWMSG.G_HIDEMSG]: (state, action) => {
    return state.merge({
      show: true,
      msg: action.data
    })
  }
});
