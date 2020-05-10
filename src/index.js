import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import './style/media720.scss';
import './style/zindex.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
