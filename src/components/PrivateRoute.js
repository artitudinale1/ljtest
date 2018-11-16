import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import PrivatePage from './PrivatePage';
import {getTokenFromStorage} from '../utils';

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      getTokenFromStorage() ? (
        <PrivatePage>
          <Component {...props} />
        </PrivatePage>
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      )
    }
  />
);
