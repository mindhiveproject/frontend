import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import ViewProtocolPage from './viewPage';

import Navigation from './navigation';

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

class ViewProtocol extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Query query={SINGLE_PROTOCOL_QUERY} variables={{ id: this.props.id }}>
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            if (!data || !data.consent)
              return <p>No IRB protocol found for id {this.props.id}</p>;
            return (
              <ViewProtocolPage
                title="View protocol"
                loading={loading}
                consent={data.consent}
              />
            );
          }}
        </Query>
      </>
    );
  }
}

export default ViewProtocol;
