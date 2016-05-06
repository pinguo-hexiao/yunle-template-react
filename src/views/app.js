import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Immutable, { is } from 'immutable';
import * as actions from '../actions';
import '../assets/css/base.less';
import 'antd/style/index.less'
import G_msg from '../components/G_msg'

class App extends Component {
  constructor (props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {}, thisState = this.state || {};
    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }
  render() {
    const {
      actions,
      children,
      routeActions,
      routing,
      test,
      g_showMsg
    } = this.props;
		return (<div>
          <div>
            { test.getIn(['test','text']) }
            <button onClick={actions.test_say.bind(this, Math.random())}>redux同步操作</button>
          </div>
          <div>
            { test.getIn(['test','async']) }
            <button onClick={actions.test_async.bind(this, Math.random())}>redux 3秒异步操作</button>
          </div>
            {
              React.cloneElement(children || <span>没有子页面</span>, {
                actions,
                routeActions,
                routing
              })
            }
            <G_msg msg={g_showMsg.toJS()} hideMsg = {actions.G_hideMsg} />
           </div>);
  }
}

App.propTypes = {
  routing : PropTypes.object.isRequired,
  test    : PropTypes.object.isRequired,
  g_showMsg : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing : state.routing,
    test    : state.test,
    g_showMsg: state.g_showMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    routeActions: bindActionCreators(routerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
