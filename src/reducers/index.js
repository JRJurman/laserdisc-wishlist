import { combineReducers } from 'redux';

import apiServer from './apiServer';
import listState from './listState';
import facebookAPI from './facebookAPI';

export default combineReducers({
  apiServer,
  listState,
  facebookAPI
});
