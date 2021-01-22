import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import User from '../components/User';
import RecipeList from '../components/RecipeList';
import Recipe from '../components/Recipe';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user/:id" exact component={User} />
      <Route path="/recipes" exact component={RecipeList} />
      <Route path="/recipe/:id" exact component={Recipe} />
    </Switch>
  </Router>
);
