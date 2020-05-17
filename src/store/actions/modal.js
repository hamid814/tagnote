import { SET_MODAL } from '../types';

export const setModal = (status, type) => (dispatch, getState) => {
  if (status === 'off') {
    dispatch({
      type: SET_MODAL,
      payload: {
        status,
        type: getState().modal.modalType,
      },
    });
  } else if (status === 'on') {
    dispatch({
      type: SET_MODAL,
      payload: {
        status,
        type,
      },
    });
  }
};
