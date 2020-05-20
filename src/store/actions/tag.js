import axios from 'axios';
import { setAlert } from './alert';

import { ADD_TAG, GET_TAG } from '../types';

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

export const addTag = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/v1/tags`, formData, config);

    dispatch({
      type: ADD_TAG,
      payload: res.data.data,
    });

    return res.data.data;
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error), 'danger', 3500);
  }
};
