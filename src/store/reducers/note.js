import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SELECT_NOTE,
  SET_LOADING,
} from '../types';

const initialState = {
  notes: [],
  note: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === payload._id ? payload : note
        ),
        note: state.note._id === payload._id ? payload : state.note,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
      };
    case SELECT_NOTE:
      return {
        ...state,
        note: payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
}
