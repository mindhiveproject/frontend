import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import EditProtocolForm from './form';

import { MY_PROTOCOLS_QUERY } from './Board/my';
import { ALL_PROTOCOLS_QUERY } from './Board/all';

const SINGLE_PROTOCOL_QUERY = gql`
  query SINGLE_PROTOCOL_QUERY($id: ID!) {
    consent(where: { id: $id }) {
      id
      title
      organization
      description
      settings
      info
      collaborators {
        id
        username
      }
    }
  }
`;

const UPDATE_PROTOCOL = gql`
  mutation UPDATE_PROTOCOL(
    $id: ID!
    $title: String
    $organization: String
    $description: String
    $settings: Json
    $info: Json
    $collaborators: [String]
  ) {
    updateConsent(
      id: $id
      title: $title
      organization: $organization
      description: $description
      settings: $settings
      info: $info
      collaborators: $collaborators
    ) {
      id
      title
      organization
      description
      settings
      info
      collaborators {
        id
        username
      }
    }
  }
`;

class UpdateProtocol extends Component {
  update = async (e, state, updateConsentMutation) => {
    e.preventDefault();
    const res = await updateConsentMutation({
      variables: {
        id: this.props.id,
        ...state,
      },
    });
    Router.push('/irb/my');
  };

  render() {
    return (
      <Query query={SINGLE_PROTOCOL_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.consent)
            return <p>No IRB protocol found for id {this.props.id}</p>;
          return (
            <Mutation
              mutation={UPDATE_PROTOCOL}
              variables={this.state}
              refetchQueries={[
                { query: MY_PROTOCOLS_QUERY },
                { query: ALL_PROTOCOLS_QUERY },
              ]}
            >
              {(updateConsent, { loading, error }) => (
                <EditProtocolForm
                  title="Edit protocol"
                  error={error}
                  loading={loading}
                  consent={data.consent}
                  onSubmit={this.update}
                  callback={updateConsent}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateProtocol;
