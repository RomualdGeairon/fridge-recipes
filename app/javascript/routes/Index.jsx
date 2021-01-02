import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import User from '../components/User';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user/:id" component={User} />
    </Switch>
  </Router>
);
