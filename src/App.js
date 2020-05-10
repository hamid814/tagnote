import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './sotre/store';

import Navbar from 'components/layout/Navbar';
import Modal from 'components/modal/Modal';
import Alert from 'components/layout/Alert';
// pages
import Home from 'components/pages/home/Home';
import TagPage from 'components/pages/tag/TagPage';
import Tags from 'components/pages/tags/Tags';
import NotePage from 'components/pages/note/NotePage';
import Statistics from 'components/pages/statistics/Statistics';
import Rules from 'components/pages/rules/Rules';
import CurrentTasks from 'components/pages/currenttasks/CurrentTasks';

const App = () => {
  const publicUrl = process.env.PUBLIC_URL;

  console.log('how to relate tags to each other???');
  console.log('tag with no notes page');
  console.log('tags to be pinned in homepage or made starred');
  console.log('add flag in tag page if tag has no color or desc');

  return (
    <Provider store={store}>
      <Router>
        <>
          <Modal />
          <Alert />
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path={`${publicUrl}/`} component={Home} />
              <Route exact path={`${publicUrl}/hashnote`} component={Home} />
              <Route exact path={`${publicUrl}/tag/:id`} component={TagPage} />
              <Route exact path={`${publicUrl}/tags`} component={Tags} />
              <Route
                exact
                path={`${publicUrl}/note/:id`}
                component={NotePage}
              />
              <Route
                exact
                path={`${publicUrl}/statics`}
                component={Statistics}
              />
              <Route exact path={`${publicUrl}/rules`} component={Rules} />
              <Route
                exact
                path={`${publicUrl}/current-tasks`}
                component={CurrentTasks}
              />
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
};

export default App;
