import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import options from './options';
import note from './note';
import tag from './tag';
import auth from './auth';

export default combineReducers({
  alert,
  modal,
  note,
  tag,
  auth,
  options,
});
