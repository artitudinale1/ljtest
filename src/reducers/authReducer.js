import {authConstants} from '../constants';

const token = JSON.parse(
  localStorage.getItem('token') || sessionStorage.getItem('token'),
);

const initialState = {
  token,
  loggedIn: token ? true : false,
  rememberMe: false,
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: false,
        token: action.auth.token,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token: action.auth.token,
      };
    case authConstants.LOGIN_FAILURE:
      return {...state, loggedIn: false};
    case authConstants.LOGOUT:
      return {};
    case authConstants.LOGIN_REMEMBER:
      return {...state, rememberMe: action.shouldRemember};
    default:
      return state;
  }
}
