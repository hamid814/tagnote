export default (state, action) => {
  switch (action.type) {
    case 'set-alert':
      return {
        ...state,
        alertStatus: action.payload.status,
        alertMsg: action.payload.msg,
        alertType: action.payload.type,
        alertTime: action.payload.time,
      }
    default:
      return state;
  }
};