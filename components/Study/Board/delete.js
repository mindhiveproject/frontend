import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { MY_STUDIES_QUERY } from './my';
import { ALL_STUDIES_QUERY } from './all';

const DELETE_STUDY_MUTATION = gql`
  mutation DELETE_STUDY_MUTATION($id: ID!) {
    deleteStudy(id: $id) {
      id
    }
  }
`;

class DeleteStudy extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: MY_STUDIES_QUERY });
    // console.log('data', data);
    // console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.myStudies = data.myStudies.filter(
      study => study.id !== payload.data.deleteStudy.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: MY_STUDIES_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_STUDY_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        refetchQueries={[{ query: ALL_STUDIES_QUERY }]}
      >
        {(deleteStudy, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this study?')) {
                deleteStudy().catch(err => {
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

export default DeleteStudy;
