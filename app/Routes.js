import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CartografiaPage from './containers/CartografiaPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.CARTOGRAFIA} component={CartografiaPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
