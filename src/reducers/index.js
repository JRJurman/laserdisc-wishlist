import { combineReducers } from 'redux';

import apiServer from './apiServer';
import listState from './listState';

export default combineReducers({
  apiServer,
  listState
});
