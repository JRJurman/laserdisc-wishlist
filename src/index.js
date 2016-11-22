import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import './index.css';

import Main from './pages/Main';
import List from './pages/List';
import PageWrapper from './pages/PageWrapper';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" components={PageWrapper}>
        <IndexRoute components={Main} />
        <Route path="lists/:listId/" components={List} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
