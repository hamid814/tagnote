import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store/store';

// layout
import Navbar from 'components/layout/Navbar';
import Modal from 'components/modal/Modal';
import Alert from 'components/layout/Alert';

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
      <Router>
        <>
          <Modal />
          <Alert />
          <Navbar />
          <div className="container">
            <RoutesContainer />
          </div>
        </>
      </Router>
    </Provider>
  );
};

export default App;
