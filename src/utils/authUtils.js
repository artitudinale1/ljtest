import {store} from './store';

export function authHeader() {
  // return authorization header with jwt token
  const token = getTokenFromStorage();

  return token
    ? {
        Authorization: 'Bearer ' + JSON.parse(token),
        'Content-Type': 'application/json',
      }
    : {};
}

export function getTokenFromStorage() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

export function setTokeninStorage(token) {
  const {rememberMe} = store.getState().authentication;
  rememberMe
    ? window.localStorage.setItem('token', token)
    : window.sessionStorage.setItem('token', token);
}

export function removeTokenFromStorage() {
  window.localStorage.removeItem('token');
  window.sessionStorage.removeItem('token');
}
