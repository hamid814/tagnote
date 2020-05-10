import { SET_ALERT } from '../types';

export const setAlert = (status, msg, type, time) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      status,
      msg,
      type,
    },
  });

  setTimeout(() => {
    dispatch({
      type: SET_ALERT,
      payload: {
        status: 'off',
        msg,
        type,
      },
    });
  }, time);
};
