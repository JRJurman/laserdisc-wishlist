import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import './index.css';

import Main from './pages/Main';
import PageWrapper from './pages/PageWrapper';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" components={PageWrapper}>
      <IndexRoute components={Main} />
      <Route path="lists/:listId" components={Main} />
    </Route>
  </Router>,
  document.getElementById('root')
);
