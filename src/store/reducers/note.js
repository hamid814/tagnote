import { SET_NOTES } from '../types';

const initialState = {
  notes: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_NOTES:
      return {
        ...state,
        notes: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
