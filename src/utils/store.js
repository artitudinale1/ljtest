import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import invariant from 'redux-immutable-state-invariant';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(invariant(), thunkMiddleware, loggerMiddleware),
  ),
);
