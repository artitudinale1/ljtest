import React from 'react';
import {connect} from 'react-redux';
import {authActions} from '../actions';
import {assetsActions} from '../actions';

import {getTokenFromStorage} from '../utils';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(assetsActions.getAssets());
  }

  render() {
    const {authentication, assets} = this.props;
    const maxWidth = {
      maxWidth: 600,
      wordBreak: 'break-all',
    };
    return (
      <div style={maxWidth}>
        <h1>Welcome</h1>
        <p>You're logged in with React and JWT!!</p>
        <p>Local: {window.localStorage.getItem('token')}</p>
        <p>Session: {window.sessionStorage.getItem('token')}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {authentication, assets} = state;
  return {authentication, assets};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};
