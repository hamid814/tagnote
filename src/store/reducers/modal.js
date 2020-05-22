import { SET_MODAL } from '../types';

const initialState = {
  modalStatus: 'on', // values: on, off, first-off
  modalType: 'login-modal',
  modalData: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL:
      return {
        modalStatus: payload.status,
        modalType: payload.type,
        modalData: payload.data,
      };
    default:
      return {
        ...state,
      };
  }
}
