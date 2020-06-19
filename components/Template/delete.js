import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { MY_TEMPLATES_QUERY } from './mybank';

const DELETE_TEMPLATE_MUTATION = gql`
  mutation DELETE_TEMPLATE_MUTATION($id: ID!) {
    deleteTemplate(id: $id) {
      id
    }
  }
`;

class DeleteTemplate extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: MY_TEMPLATES_QUERY });
    console.log('data', data);
    console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.myTemplates = data.myTemplates.filter(
      template => template.id !== payload.data.deleteTemplate.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: MY_TEMPLATES_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_TEMPLATE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteTemplate, { error }) => (
          <button
            onClick={() => {
              if (
                confirm('Are you sure you want to delete this task template?')
              ) {
                deleteTemplate().catch(err => {
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

export default DeleteTemplate;
