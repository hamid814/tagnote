import axios from 'axios';
import { setAlert } from './alert';

import { GET_TAGS, GET_TAG, ADD_TAG, DELETE_TAG } from '../types';

export const getTags = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/tags`);

    dispatch({
      type: GET_TAGS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'danger', 3500));
  }
};

export const getTag = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/tags/${id}/notes`);

    dispatch({
      type: GET_TAG,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'danger', 3500));
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
    dispatch(setAlert('on', err.response.data.error, 'danger', 3500));
  }
};

export const deleteTag = (id, tagName) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/tags/${id}`);

    dispatch({
      type: DELETE_TAG,
      payload: id,
    });

    dispatch(setAlert('on', `Tag ${tagName} deleted`, 'info', 3500));
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'danger', 3500));
  }
};
