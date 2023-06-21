import Swal from 'sweetalert2';
import axios from 'axios';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './config';
const { REACT_APP_API_BASE_URL } = process.env;

export const login = (data) => {
  return (dispatch) => {
    axios
      .post(`${REACT_APP_API_BASE_URL}/api/users/authentication`, data)
      .then((response) => {
        if (response.data.status === false) {
          Swal.fire({
            icon: 'error',
            title: 'Wrong Email Address or Password',
            text: 'Please try again',
          });
        } else {
          dispatch({
            type: USER_LOGGED_IN,
            payload: response.data,
          });
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      });
  };
};

export const logout = (history) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT });
    sessionStorage.clear();
    localStorage.clear();
  };
};