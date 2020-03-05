import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalProvider } from './context/GlobalState';
import * as serviceWorker from './serviceWorker';

const StateContainer = () => {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  )
}

ReactDOM.render(<StateContainer />, document.getElementById('root'));

serviceWorker.register();
