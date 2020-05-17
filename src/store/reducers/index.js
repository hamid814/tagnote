import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import note from './note';

export default combineReducers({
  alert,
  modal,
  note,
});
