import store from '../../store/store';

import { closeOptions } from 'store/actions/options';

const dispatch = store.dispatch;

const functions = {
  openNote: () => dispatch(closeOptions()),
};

export default functions;
