import React, { Component } from 'react';
import Login from '../../Login/index';

class LoginPage extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    const { id } = this.state;
    return <Login proceedTo={id} />;
  }
}

export default LoginPage;
