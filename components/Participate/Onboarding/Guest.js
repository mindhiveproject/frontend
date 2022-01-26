import React, { Component } from 'react';
import Demographics from './Demographics';

class Guest extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    return <Demographics {...this.props} />;
  }
}

export default Guest;
