import React, { Component } from 'react';
import { compose, graphql, Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SignForm } from '../../Styles/Forms';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import Error from '../../ErrorMessage/index';

const PARTICIPANT_CONFIRMATION_MUTATION = gql`
  mutation PARTICIPANT_CONFIRMATION_MUTATION(
    $email: String!
    $confirmationToken: String!
  ) {
    participantConfirmEmail(
      email: $email
      confirmationToken: $confirmationToken
    ) {
      message
    }
  }
`;

class ParticipantConfirm extends Component {
  async componentDidMount() {
    const res = await this.props.participantConfirmEmail({
      variables: {
        email: this.props.email,
        confirmationToken: this.props.token,
      },
    });
    if (
      res &&
      res.data &&
      res.data.participantConfirmEmail &&
      res.data.participantConfirmEmail.message &&
      res.data.participantConfirmEmail.message === 'OK'
    ) {
      Router.push({
        pathname: '/bank',
      });
    }
  }

  render() {
    return (
      <>
        <Error error={this.props.participantConfirmEmailResult.error} />
        Confirmed
      </>
    );
  }
}

// export default ParticipantConfirm;

export default compose(
  graphql(PARTICIPANT_CONFIRMATION_MUTATION, {
    name: 'participantConfirmEmail',
  })
)(ParticipantConfirm);

// <Mutation
//   mutation={PARTICIPANT_CONFIRMATION_MUTATION}
//   variables={{
//     email: 'produkt5@yandex.ru',
//     confirmationToken: this.props.token,
//   }}
//   refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
// >
//   {(participantConfirmEmail, { error, loading }) => (
//     <SignForm
//       method="post"
//       onSubmit={async e => {
//         e.preventDefault();
//         const res = await participantConfirmEmail();
//         Router.push({
//           pathname: '/me',
//         });
//       }}
//     ></SignForm>
//   )}
// </Mutation>
