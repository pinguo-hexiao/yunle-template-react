import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { routerActions } from "react-router-redux";
import { bindActionCreators } from "redux";
import { is } from "immutable";
import * as actions from "../actions";

class App extends Component {
  constructor(props){
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
      routing
    } = this.props;
		return (<div>
            {
              React.cloneElement(children || <span>没有子页面</span>, {
                actions,
                routeActions,
                routing
              })
            }
           </div>);
  }
}

App.propTypes = {
  routing : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing : state.routing
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
