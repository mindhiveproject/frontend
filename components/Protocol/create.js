import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { MY_PROTOCOLS_QUERY } from './Board/my';
import { ALL_PROTOCOLS_QUERY } from './Board/all';

import EditProtocolForm from './form';

const CREATE_NEW_PROTOCOL = gql`
  mutation CREATE_NEW_PROTOCOL(
    $title: String!
    $organization: String!
    $description: String
    $info: Json
    $settings: Json
    $collaborators: [String]
  ) {
    createConsent(
      title: $title
      organization: $organization
      description: $description
      info: $info
      settings: $settings
      collaborators: $collaborators
    ) {
      id
    }
  }
`;

class AddProtocol extends Component {
  save = async (e, state, createProtocolMutation) => {
    e.preventDefault();
    const res = await createProtocolMutation({
      variables: {
        ...state,
      },
    });
    Router.push(`/irb/my`);
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_NEW_PROTOCOL}
        refetchQueries={[
          { query: MY_PROTOCOLS_QUERY },
          { query: ALL_PROTOCOLS_QUERY },
        ]}
      >
        {(createConsent, { loading, error }) => (
          <EditProtocolForm
            title="Add new protocol"
            error={error}
            loading={loading}
            consent={{}}
            onSubmit={this.save}
            callback={createConsent}
          />
        )}
      </Mutation>
    );
  }
}

export default AddProtocol;
