import { combineReducers } from 'redux';
import configure from './configure';
import nav from './nav';

const rootReducer = combineReducers({
  configure,
  nav
});

export default rootReducer;
