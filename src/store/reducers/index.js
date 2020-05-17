import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';

export default combineReducers({
  alert,
  modal,
});
