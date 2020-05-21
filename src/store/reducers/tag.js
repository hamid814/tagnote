import { GET_TAGS, GET_TAG, ADD_TAG, DELETE_TAG } from '../types';

const initialState = {
  tags: [],
  tag: {},
  notes: [], // for a single tag
  otherNotes: [], // for a single tag
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TAGS:
      return {
        ...state,
        tags: payload,
        loading: false,
      };
    case GET_TAG:
      return {
        ...state,
        tag: payload.tag,
        notes: payload.notes,
        otherNotes: payload.otherNotes,
        loading: false,
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [payload, state.tags],
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag._id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
}
