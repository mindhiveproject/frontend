import React, { Component } from 'react';
// import { Mutation } from '@apollo/client/react/components';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import Error from '../../ErrorMessage/index';

const EMAIL_CONFIRMATION_MUTATION = gql`
  mutation EMAIL_CONFIRMATION_MUTATION(
    $email: String!
    $confirmationToken: String!
  ) {
    confirmEmail(email: $email, confirmationToken: $confirmationToken) {
      message
    }
  }
`;

class EmailConfirm extends Component {
  async componentDidMount() {
    const res = await this.props.confirmEmail({
      variables: {
        email: this.props.email,
        confirmationToken: this.props.token,
      },
    });
    if (
      res &&
      res.data &&
      res.data.confirmEmail &&
      res.data.confirmEmail.message &&
      res.data.confirmEmail.message === 'OK'
    ) {
      Router.push({
        pathname: '/',
      });
    }
  }

  render() {
    return (
      <>
        <Error error={this.props.confirmEmailResult.error} />
        Confirmed
      </>
    );
  }
}

export default compose(
  graphql(EMAIL_CONFIRMATION_MUTATION, {
    name: 'confirmEmail',
  })
)(EmailConfirm);
