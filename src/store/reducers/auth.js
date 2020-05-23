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

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: {},
  error: null,
  token: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('tagnote-auth-token', payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        token: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('tagnote-auth-token', payload);
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        token: payload,
      };
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('tagnote-auth-token');
      return {
        ...state,
        loading: true,
        token: null,
        isAuthenticated: false,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
}
