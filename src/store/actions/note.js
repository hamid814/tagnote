import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_NOTES,
  ADD_NOTE,
  SELECT_NOTE,
  SET_LOADING,
  DELETE_NOTE,
} from '../types';

export const getNotes = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/notes');

    dispatch({
      type: GET_NOTES,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

export const addNote = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/notes', formData, config);

    dispatch({
      type: ADD_NOTE,
      payload: res.data.data,
    });
    dispatch(setAlert('on', 'Note added', 'success', 3500));
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/notes/${id}`);

    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

export const selectNote = (id) => async (dispatch) => {
  setLoading(dispatch);
  try {
    const res = await axios.get(`/api/v1/notes/${id}`);

    dispatch({
      type: SELECT_NOTE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

const setLoading = (dispatch) => {
  dispatch({ type: SET_LOADING });
};
