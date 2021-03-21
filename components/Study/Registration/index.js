import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import RegistrationPage from './page';

class RegistrationFlow extends Component {
  render() {
    return (
      <RegistrationPage
        study={this.props.study}
        user={this.props.user}
        onStartTheTask={this.props.onStartTheTask}
        onClose={this.props.onClose}
      />
    );
  }
}

export default RegistrationFlow;
