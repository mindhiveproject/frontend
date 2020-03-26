import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { MY_PARAMETERS_QUERY } from '../../Experiments/Custom/my';

const DELETE_PARAMETER_MUTATION = gql`
  mutation DELETE_PARAMETER_MUTATION($id: ID!) {
    deleteParameter(id: $id) {
      id
    }
  }
`;

class DeleteCustomExperiment extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: MY_PARAMETERS_QUERY });
    console.log('data', data);
    console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.myParameters = data.myParameters.filter(
      parameter => parameter.id !== payload.data.deleteParameter.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: MY_PARAMETERS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_PARAMETER_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteParameter, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this experiment?')) {
                deleteParameter().catch(err => {
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

export default DeleteCustomExperiment;
