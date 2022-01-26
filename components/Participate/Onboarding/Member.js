import React, { Component } from 'react';
import Demographics from './Demographics';

class Member extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    return <Demographics {...this.props} />;
  }
}

export default Member;
