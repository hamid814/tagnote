import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Modal from './components/modal/Modal';
import Alert from './components/layout/Alert';
// pages
import Home from './components/pages/home/Home';
import Tag from './components/pages/tag/Tag';
import Note from './components/pages/note/Note';
import Statistics from './components/pages/statistics/Statistics';
import Rules from './components/pages/rules/Rules';
import CurrentTasks from './components/pages/currenttasks/CurrentTasks';

const App = () => {
  const publicUrl = process.env.PUBLIC_URL
  
  return (
    <Router>
      <>
        <Modal />
        <Alert />
        <Navbar />
        <div className='container'>
          from app.js
          <Switch>
            <Route exact path={`${publicUrl}/`} component={Home} />
            <Route exact path={`${publicUrl}/hashnote`} component={Home} />
            <Route exact path={`${publicUrl}/tag/:id`} component={Tag} />
            <Route exact path={`${publicUrl}/note/:id`} component={Note} />
            <Route exact path={`${publicUrl}/statics`} component={Statistics} />
            <Route exact path={`${publicUrl}/rules`} component={Rules} />
            <Route exact path={`${publicUrl}/current-tasks`} component={CurrentTasks} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
