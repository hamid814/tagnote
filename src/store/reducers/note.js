import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  GET_NOTE,
  SET_LOADING,
  SELECT_NOTE,
  UNSELECT_NOTE,
  UNSELECT_ALL,
} from '../types';

const initialState = {
  notes: [],
  note: {},
  loading: true,
  selected: [],
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
    case GET_NOTE:
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
    case SELECT_NOTE:
      return {
        ...state,
        selected: [...state.selected, payload],
      };
    case UNSELECT_NOTE:
      return {
        ...state,
        selected: state.selected.filter((id) => id !== payload),
      };
    case UNSELECT_ALL:
      return {
        ...state,
        selected: [],
      };
    default:
      return {
        ...state,
      };
  }
}
