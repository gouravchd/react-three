import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { register } from './register.reducer';
import { alert } from './alert.reducer';
import { loader } from './loader.reducer';
import { collapsed } from './sidebar.reducer';
import { response } from './response.reducer';
const rootReducer = combineReducers({
  authentication,
  alert,
  loader,
  register,
  collapsed,
  response,
});

export default rootReducer;