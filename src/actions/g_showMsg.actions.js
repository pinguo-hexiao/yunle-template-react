import { G_SHOWMSG } from '../constants';

export function G_showMsg( text ) {
  return {
    type: G_SHOWMSG.G_SHOWMSG,
    data: text
  }
}
export function G_hideMsg() {
  return {
    type: G_SHOWMSG.G_HIDEMSG
  }
}
