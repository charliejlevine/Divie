import axios from 'src/utils/axios';
import authService from 'src/services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(email, password) {
  return async dispatch => {
    try {
      // what is this and where do we reroute to dashboard?
      dispatch({ type: LOGIN_REQUEST });

      const user = await authService.loginWithEmailAndPassword(email, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(user) {
  return dispatch =>
    dispatch({
      type: SILENT_LOGIN,
      payload: {
        user
      }
    });
}

export function logout() {
  return async dispatch => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register(values) {
  console.log('testest');
  // make call to our backend
  fetch('https://us-central1-divieapp.cloudfunctions.net/signUp', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    })
  })
    .then(response => response.json())
    .then(res => {
      // TODO: change the success to a modal instead of alert and redirect to a welcome screen
      alert(res.message);
    })
    .catch(error => {
      console.log(error);
    });

  return true;
}

export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update });

  return dispatch => {
    request.then(response =>
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data
      })
    );
  };
}
