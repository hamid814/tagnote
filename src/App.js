import React from 'react';
import { Router } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store/store';

// history
import history from 'utils/history';

// layout
import Navbar from 'components/layout/Navbar';
import Menu from 'components/menu/Menu';
import Modal from 'components/modal/Modal';
import Alert from 'components/layout/Alert';
import Options from 'components/options/Options';

// routes
import RoutesContainer from 'routing/RoutesContainer';

// web fonts (icon)
import './icon/css/tagnote-icon-set-embedded.css';

const App = () => {
  console.log('how to relate tags to each other???');
  console.log('tags to be pinned in homepage or made starred');
  console.log('add flag in tag page if tag has no color or desc');
  console.log('add headers: content-type in axios interceptors');

  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          <Modal />
          <Alert />
          <Navbar />
          <Options />
          <Menu />
          <div className="container">
            <RoutesContainer />
          </div>
        </>
      </Router>
    </Provider>
  );
};

export default App;
