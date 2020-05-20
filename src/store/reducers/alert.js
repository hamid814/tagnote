import { SET_ALERT } from '../types';

const initialState = {
  alertStatus: 'first-off',
  alertMsg: 'alert text',
  alertType: 'success',
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
      };
    default:
      return state;
  }
}
