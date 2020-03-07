export default (state, action) => {
  switch (action.type) {
    case 'set-modal':
      return {
        ...state,
        modalStatus: action.payload.status,
        modalType: action.payload.type
      }
    default:
      return state;
  }
};