import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { MY_DEVELOPED_STUDIES_QUERY } from './developed';
import { USER_DASHBOARD_QUERY } from '../../User/index';

const StyledDeleteBtn = styled.button`
  padding: 10px 5px 10px 5px;
  background: white;
  border: 2px solid red;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

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
    const data = cache.readQuery({ query: MY_DEVELOPED_STUDIES_QUERY });
    // console.log('data', data);
    // console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.myStudies = data.myStudies.filter(
      study => study.id !== payload.data.deleteStudy.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: MY_DEVELOPED_STUDIES_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_STUDY_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        refetchQueries={[{ query: USER_DASHBOARD_QUERY }]}
      >
        {(deleteStudy, { error }) => (
          <StyledDeleteBtn
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this study? This will delete the entire study from the platform for everyone. This action cannot be undone. Please proceed with caution.'
                )
              ) {
                deleteStudy().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </StyledDeleteBtn>
        )}
      </Mutation>
    );
  }
}

export default DeleteStudy;
