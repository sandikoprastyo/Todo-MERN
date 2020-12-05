import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import Update from './Update/index';

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/update' component={Update} />
      </Switch>
    </Router>
  );
};

export default Routers;
