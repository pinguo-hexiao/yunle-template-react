import { TEST, CALL_API } from '../constants';

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
        callback: () => {
          console.log(`测试redux async 回调`);
          return test_say(223)
        }
      }
    })
  }
}
