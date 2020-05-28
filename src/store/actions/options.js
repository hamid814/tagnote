import { OPEN_OPTIONS, CLOSE_OPTIONS } from '../types';

export const openOptions = (data) => (dispatch) => {
  dispatch({
    type: OPEN_OPTIONS,
    payload: data,
  });
};

export const closeOptions = () => (dispatch) => {
  dispatch({
    type: CLOSE_OPTIONS,
  });
};
