import axios from 'axios';

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
    console.log(err);
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
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
};

const setLoading = (dispatch) => {
  dispatch({ type: SET_LOADING });
};
