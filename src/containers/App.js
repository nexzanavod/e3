import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import history from '../config/history';

import Home from './Home';
import Login from './Login';

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <ReduxToastr />
        <Router history={history}>
          <Switch>
            {
              auth ? <Route path="/" name="Home" component={Home} /> : <Route path="/" name="Login Page" component={Login} />
            }
          </Switch>
        </Router>
      </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps, null)(App);
