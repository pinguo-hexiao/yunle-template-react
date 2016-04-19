import { TEST } from '../constants';

export function test_say( text ){
  const { SAY } = TEST;
  return { type: SAY, data: text }
}

export function test_async( text ){
  const { ASYNC } = TEST;
  return () => {
    return setTimeout(function () {
      return { type: ASYNC, data: text };
    }, 3000);
  };
};