import React, { Component } from 'react';
import ParticipantSignUp from './ParticipantSignUp';

class Signup extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    const { id } = this.state;
    return <ParticipantSignUp proceedTo={id} />;
  }
}

export default Signup;
