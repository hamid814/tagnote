import axios from 'axios';
import setAuthHeader from 'utils/setAuthHeader';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_FAIL,
  LOAD_USER,
  LOGOUT,
  CLEAR_ERROR,
} from '../types.js';
import { setAlert } from './alert';

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('tagnote-auth-token');

  setAuthHeader(token);

  try {
    const res = await axios.get('/api/v1/auth/me');

    if (res.data.success) {
      dispatch({
        type: LOAD_USER,
        payload: res.data.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data.error,
    });

    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      hedaers: {
        'Content-Type': 'application/json',
      },
    };

    formData.email = formData.email.toLowerCase();

    const res = await axios.post('/api/v1/auth/register', formData, config);

    if (res.data.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });
    }

    dispatch(loadUser());

    dispatch(setAlert('on', 'account succcessfully created', 'success', 3000));
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.error,
    });

    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      hedaers: {
        'Content-Type': 'application/json',
      },
    };

    formData.email = formData.email.toLowerCase();

    const res = await axios.post('/api/v1/auth/login', formData, config);

    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
    }

    dispatch(loadUser());

    dispatch(setAlert('on', "You're logged in", 'success', 3000));

    return true;
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.error,
    });

    setTimeout(() => {
      dispatch(clearError());
    }, 4000);

    return false;
  }
};

export const logout = (formData) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });

  dispatch(loadUser());

  dispatch(setAlert('on', 'logged out', 'info', 3000));
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
