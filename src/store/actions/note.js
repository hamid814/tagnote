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
  UNSELECT_ALL,
  DELETE_SELECTED_NOTES,
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

    console.log(res.data.data);

    dispatch({
      type: ADD_NOTE,
      payload: res.data.data,
    });
    dispatch(setAlert('on', 'Note added', 'success', 3500));
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

export const makePersonal = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/v1/notes/${id}`,
      { isPersonal: true },
      config
    );

    dispatch({
      type: UPDATE_NOTE,
      payload: res.data.data,
    });

    dispatch(setAlert('on', 'Note was updated', 'success', 3500));
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/notes/${id}`);

    if (res.data.success) {
      dispatch({
        type: DELETE_NOTE,
        payload: id,
      });
    }

    dispatch(setAlert('on', 'Note Was Deleted', 'info', 3500));

    return true;
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));

    return false;
  }
};

export const deleteSelectedNotes = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.delete('/api/v1/notes/deletemany', {
      config,
      data: {
        ids: getState().note.selected,
      },
    });

    if (res.data.success) {
      dispatch({
        type: DELETE_SELECTED_NOTES,
        payload: res.data.data,
      });
    }

    dispatch(setAlert('on', 'Notes Were Deleted', 'info', 3500));

    return true;
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));

    return false;
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

export const unSelecteAll = (id) => (dispatch) => {
  dispatch({
    type: UNSELECT_ALL,
  });
};

export const getNoteShareLink = async (id, dispatch) => {
  try {
    const res = await axios.get(`/api/v1/notes/${id}/token`);

    const token = res.data.token;

    console.log(process.env);

    return process.env.PUBLIC_URL + '/notes/view/' + token;
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error, 'warning', 3500));

    return err.response.data.error;
  }
};

export const getNoteWithToken = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/notes/view?token=' + token);

    dispatch({
      type: GET_NOTE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('on', err.response.data.error), 'warning', 3500);
  }
};

const setLoading = (dispatch) => {
  dispatch({ type: SET_LOADING });
};
