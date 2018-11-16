import {combineReducers} from 'redux';

import {authentication} from './authReducer';
import {alert} from './alertReducer';
import {assets} from './assetsReducer';

const rootReducer = combineReducers({
  alert,
  authentication,
  assets,
});

export default rootReducer;
