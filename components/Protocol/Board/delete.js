import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { MY_PROTOCOLS_QUERY } from './my';

const DELETE_PROTOCOL_MUTATION = gql`
  mutation DELETE_PROTOCOL_MUTATION($id: ID!) {
    deleteConsent(id: $id) {
      id
    }
  }
`;

class DeleteProtocol extends Component {
  // update = (cache, payload) => {
  //   // manually update the cache on the client so it matches the server
  //   // 1. read the cache
  //   const data = cache.readQuery({ query: MY_PROTOCOLS_QUERY });
  //   // 2. Filter the deleted items out of the page
  //   const myConsents = data.myConsents.filter(
  //     consent => consent.id !== payload.data.deleteConsent.id
  //   );
  //   // 3. Put the items back
  //   cache.writeQuery({
  //     query: MY_PROTOCOLS_QUERY,
  //     data: { ...data, myConsents },
  //   });
  // };

  render() {
    return (
      <Mutation
        mutation={DELETE_PROTOCOL_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        refetchQueries={[{ query: MY_PROTOCOLS_QUERY }]}
      >
        {(deleteProtocol, { error }) => (
          <button
            onClick={() => {
              if (
                confirm('Are you sure you want to delete this IRB protocol?')
              ) {
                deleteProtocol().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteProtocol;
