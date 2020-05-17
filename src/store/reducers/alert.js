import { SET_ALERT } from '../types';

const initialState = {
  alertStatus: 'first-off',
  alertMsg: 'alert text',
  alertType: 'success',
  alertTime: 1000,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alertStatus: payload.status,
        alertMsg: payload.msg,
        alertType: payload.type,
        alertTime: payload.time,
      };
    default:
      return state;
  }
}
