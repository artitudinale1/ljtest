import {authConstants} from '../constants';
import {authService} from '../services';
import {alertActions} from './';
import {history} from '../utils';

export const authActions = {
  login,
  logout,
  remember,
};

function login(username, password) {
  return dispatch => {
    dispatch(request({username}));

    authService.login(username, password).then(
      auth => {
        dispatch(success(auth));
        history.push('/assets');
      },
      error => {
        const errorMsg = error.toString();
        dispatch(failure(errorMsg));
        dispatch(alertActions.error(errorMsg));
      },
    );
  };

  function request(auth) {
    return {type: authConstants.LOGIN_REQUEST, auth};
  }
  function success(auth) {
    return {type: authConstants.LOGIN_SUCCESS, auth};
  }
  function failure(error) {
    return {type: authConstants.LOGIN_FAILURE, error};
  }
}

function logout() {
  authService.logout();
  return {type: authConstants.LOGOUT};
}

function remember(shouldRemember = false) {
  return {type: authConstants.LOGIN_REMEMBER, shouldRemember};
}
