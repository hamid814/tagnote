import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Modal from './components/modal/Modal';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';

import { AlertContext } from './context/alert/AlertState';

function App() {
  const { setAlert } = useContext(AlertContext)
  
  const onTest = () => {
    setAlert('on', 'text', 'danger', 3000)
  }
  const onTest2 = () => {
    setAlert('on', 'hey!', 'warning', 3000)
  }
  const onTest3 = () => {
    setAlert('on', 'hey!', 'success', 3000)
  }
  
  return (
    <Router>
      <>
        <Modal />
        <Alert />
        <Navbar />
        <div className="container">
          from app.js
          <button onClick={onTest}>
            alert
          </button>
          <button onClick={onTest2}>
            alert
          </button>
          <button onClick={onTest3}>
            alert
          </button>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
