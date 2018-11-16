import React from 'react';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import {authActions} from '../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    const {logout} = this.props;
    logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({submitted: true});
    const {username, password} = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const {loggingIn, rememberMe, onRememberMeToggle} = this.props;
    const {username, password, submitted} = this.state;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            this.handleSubmit(e);
          }
        }}>
        <Grid item xs={3}>
          <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                'form-group' + (submitted && !username ? ' has-error' : '')
              }>
              <TextField
                placeholder="Your email address"
                label="Email"
                name="username"
                value={username}
                onChange={this.handleChange}
              />

              {submitted &&
                !username && (
                  <div className="help-block">Username is required</div>
                )}
            </div>
            <div
              className={
                'form-group' + (submitted && !password ? ' has-error' : '')
              }>
              <TextField
                placeholder="Your password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted &&
                !password && (
                  <div className="help-block">Password is required</div>
                )}
            </div>
            <div className="form-group">
              <FormGroup row>
                <FormControlLabel
                  control={<Button onClick={this.handleSubmit}>Login</Button>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={rememberMe}
                      onChange={e => {
                        onRememberMeToggle(e.target.checked);
                      }}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
              </FormGroup>
              {loggingIn && <CircularProgress />}
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onRememberMeToggle: shouldRemember => {
      dispatch(authActions.remember(shouldRemember));
    },
    logout: () => {
      dispatch(authActions.logout());
    },
    login: (username, password) => {
      dispatch(authActions.login(username, password));
    },
  };
}

function mapStateToProps(state) {
  const {loggingIn, rememberMe} = state.authentication;
  return {
    loggingIn,
    rememberMe,
  };
}

const connectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
export {connectedLoginPage as LoginPage};
