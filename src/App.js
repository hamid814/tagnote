import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import moment from 'moment';

import Navbar from './components/layout/Navbar';
import Modal from './components/modal/Modal';
import Alert from './components/layout/Alert';
import Home from './components/pages/home/Home';
import Statistics from './components/pages/statistics/Statistics';
import Rules from './components/pages/rules/Rules';
import CurrentTasks from './components/pages/currenttasks/CurrentTasks';

function App() {
  console.log(moment.now())
  
  return (
    <Router>
      <>
        <Modal />
        <Alert />
        <Navbar />
        <div className="container">
          from app.js
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/statics' component={Statistics} />
            <Route exact path='/rules' component={Rules} />
            <Route exact path='/current-tasks' component={CurrentTasks} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
