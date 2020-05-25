import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_NOTES,
  ADD_NOTE,
  GET_NOTE,
  SET_LOADING,
  UPDATE_NOTE,
  DELETE_NOTE,
  SELECT_NOTE,
  UNSELECT_NOTE,
} from '../types';

export const getNotes = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/notes');

    dispatch({
      type: GET_NOTES,
      payload: res.data.data,
    });
  } catch (err) {
    err.response &&
      err.response.data &&
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

    dispatch(setAlert('on', 'Note Was Deleted', 'info', 3500));

    return true;
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));

    return false;
  }
};

export const updateNote = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/v1/notes/${id}`, formData, config);

    dispatch({
      type: UPDATE_NOTE,
      payload: res.data.data,
    });

    dispatch(setAlert('on', 'Note was updated', 'success', 3500));
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

export const getNote = (id) => async (dispatch) => {
  setLoading(dispatch);
  try {
    const res = await axios.get(`/api/v1/notes/${id}`);

    dispatch({
      type: GET_NOTE,
      payload: res.data.data,
    });
  } catch (err) {
    err.response &&
      err.response.data &&
      dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

export const selectNote = (id) => (dispatch) => {
  dispatch({
    type: SELECT_NOTE,
    payload: id,
  });
};

export const unSelectNote = (id) => (dispatch) => {
  dispatch({
    type: UNSELECT_NOTE,
    payload: id,
  });
};

const setLoading = (dispatch) => {
  dispatch({ type: SET_LOADING });
};
