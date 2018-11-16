import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {routes, history} from '../utils';
import {alertActions} from '../actions';
import {LoginPage, PrivateRoute} from './';

import '../stylesheets/App.css';
import '../stylesheets/GlobalStyles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const {alert} = this.props;

    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
           
            <Router history={history}>
              <div>
                {routes.map(
                  (r,i) =>
                    r.private ? (
                      <PrivateRoute
                        exact
                        path={r.path}
                        component={r.component}
                        key={i}
                      />
                    ) : (
                      <Route  key={i} path={r.path} component={r.component} />
                    ),
                )}
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
