export default (state, action) => {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: action.payload
      }
    default:
      return state;
  }
};