import React,{Component,PropTypes} from 'react'
import { message } from 'antd'

export default class G_msg extends Component{
  constructor(props){
    super(props)
  }
  static propTypes = {
    hideMsg: PropTypes.func.isRequired
  }
  componentWillReceiveProps(nextProps){
    const { msg } = nextProps
    const { hideMsg } = this.props
    console.log(msg);
    if(msg.content !== '' && msg.type){
      switch(msg.type){
        case 'error':
          message.error(msg.content)
          break
        case 'success':
          message.success(msg.content)
          break
        case 'info':
          message.info(msg.content)
          break
        case 'warning':
          message.warn(msg.content)
          break
        default:
          message.error(msg.content)
      }
      hideMsg()
    }
  }
  render(){
    return (
      <div>

      </div>
    )
  }
}
