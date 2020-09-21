import axios from 'src/utils/axios';
import authService from 'src/services/authService';
import { DayBgRow } from '@fullcalendar/daygrid';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';


export function login(email, password, onSubmitSuccess) {
  return async dispatch => {
    try {
      // 1. verify email and password through cloud fn 
      fetch('https://us-central1-divieapp.cloudfunctions.net/login', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(res => {
        if (res.message !== 'Email or password incorrect') {
          
          // 2. recieve user object with token
          // Don't know what to do with token yet
          const token = res.token;

          // 3. Gets user info to update state
          fetch('https://us-central1-divieapp.cloudfunctions.net/getUserData', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email
            })
          })
          .then(response => response.json())
          .then(res => {

            console.log(res)

            // going to update user state with more later
            const user = {
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              avatar: res.data.imageUrl
            }

            // 3. send payload to my root reducer
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {
                user
              }
            })

            // forward to dashboard
            onSubmitSuccess()
          
          })
          .catch (error => {
            alert(error)
            throw error
          })
        } else {
          alert('Email or password incorrect')
        }
      })
      .catch(error => {
        alert(error)
        throw error
      })
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
    try {
      fetch('https://us-central1-divieapp.cloudfunctions.net/logout', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => {
        console.log(res)

        dispatch({
          type: LOGOUT
        });
      })
      .catch( error => {
        alert(error)
        throw error
      })
    } catch(error) {
      console.log(error)
      throw error
    }
  }
}

export function register(values, onSubmitSuccess) {
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
      if (res.message === "Email has been already taken") {
        alert(res.message);
      } else {
        alert('Account Created! Confirmation email sent.')
        onSubmitSuccess(); 
      }
    })
    .catch(error => {
      alert(error);
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
