import { TEST, CALL_API } from '../constants';

import { G_showMsg } from './g_showMsg.actions'

export function test_say( text ){
  const { SAY } = TEST;
  return { type: SAY, data: text }
}

// export function test_async( text ){
//   const { ASYNC } = TEST;
//   return (dispatch, getState) => {
//     setTimeout(() => {
//       return dispatch({ type: ASYNC, data: text });
//     }, 3000);
//   };
// }

export function test_async( text ){
  const { ASYNC } = TEST;
  return (dispatch, getState)=>{
    console.log(getState())
    dispatch({
      [CALL_API]: {
        types: [ TEST.SEND_GET_REQUEST, TEST.SEND_GET_SUCCESS, TEST.SEND_GET_FAILURE ],
        endpoint: '/user',
        method: 'GET',
        body: {},
        callback: (err) => {
          console.log(`测试redux async 回调`);
          if(err){
            return G_showMsg({type: 'error', content:err})
          }
          return G_showMsg({type: 'success', content:'成功'})
        }
      }
    })
  }
}
