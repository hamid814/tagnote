import axios from 'axios';
import { setAlert } from './alert';

import { GET_TAG } from '../types';

export const getTag = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/tags/${id}/notes`);

    dispatch({
      type: GET_TAG,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error), 'danger', 3500);
  }
};
