import { OPEN_OPTIONS, CLOSE_OPTIONS } from '../types';

const initialState = {
  status: 'first-close', // val: open, close, first-close
  data: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_OPTIONS:
      return {
        ...state,
        status: 'open',
        data: payload,
      };
    case CLOSE_OPTIONS:
      return {
        ...state,
        status: 'close',
      };
    default:
      return {
        ...state,
      };
  }
}
