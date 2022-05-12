import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';

import { MY_DEVELOPED_STUDIES_QUERY } from './developed';
import { USER_DASHBOARD_QUERY } from '../../User/index';

const DELETE_STUDY_MUTATION = gql`
  mutation DELETE_STUDY_MUTATION($id: ID!) {
    preDeleteStudy(id: $id) {
      id
    }
  }
`;

class DeleteStudy extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: MY_DEVELOPED_STUDIES_QUERY });
    // 2. Filter the deleted items out of the page
    const myStudies = [...data.myStudies].filter(
      study => study.id !== payload.data.preDeleteStudy.id
    );
    // 3. Put the items back
    cache.writeQuery({
      query: MY_DEVELOPED_STUDIES_QUERY,
      data: { myStudies },
    });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_STUDY_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        refetchQueries={[{ query: USER_DASHBOARD_QUERY }]}
      >
        {(deleteStudy, { error, loading }) => {
          if (loading) {
            return <div>updating...</div>;
          }
          return (
            <Button
              style={{ background: '#D53533', color: '#FFFFFF' }}
              content="Delete"
              onClick={() => {
                if (this.props.inputValue === 'DELETE') {
                  deleteStudy().catch(err => {
                    alert(err.message);
                  });
                } else {
                  return alert('Please type DELETE to delete your study');
                }
                this.props.setOpen(false);
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteStudy;
