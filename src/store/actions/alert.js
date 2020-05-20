import { SET_ALERT } from '../types';

export const setAlert = (status, msg, type, time) => (dispatch, getState) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      status,
      msg: msg || getState().alert.alertMsg,
      type: type || getState().alert.alertType,
    },
  });

  const deldeteAlert = setTimeout(() => {
    dispatch({
      type: SET_ALERT,
      payload: {
        status: 'off',
        msg,
        type,
      },
    });
  }, time || 3000);

  status === 'off' && clearTimeout(deldeteAlert);
};
