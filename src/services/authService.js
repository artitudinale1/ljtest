import {setTokeninStorage, removeTokenFromStorage} from '../utils';

export const authService = {
  login,
  logout,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: JSON.stringify({email: username, password: password}),
  };

  return fetch(
    `https://api-development.limejump.com/api/2.0/auth`,
    requestOptions,
  )
    .then(handleResponse)
    .then(body => {
      if (body.auth.token) {
        const authToken = JSON.stringify(body.auth.token);
        setTokeninStorage(authToken);
      }

      return body.auth;
    });
}

function logout() {
  // remove user from local storage to log user out
  removeTokenFromStorage();
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
