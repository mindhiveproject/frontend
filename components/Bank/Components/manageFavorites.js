import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { MY_FAVORITE_TASKS_QUERY } from '../../Development/Study/StudyBuilder/Selector/favorite';

const MANAGE_TASK_FAVORITES = gql`
  mutation MANAGE_TASK_FAVORITES($id: ID!, $action: String!) {
    manageFavoriteTasks(id: $id, action: $action) {
      message
    }
  }
`;

const StyledBtn = styled.div`
  cursor: pointer;
`;

class ManageFavorites extends Component {
  render() {
    const { id, isFavorite } = this.props;
    return (
      <Mutation
        mutation={MANAGE_TASK_FAVORITES}
        variables={{ id, action: isFavorite ? 'disconnect' : 'connect' }}
        refetchQueries={[
          { query: CURRENT_USER_RESULTS_QUERY },
          { query: MY_FAVORITE_TASKS_QUERY, variables: { selector: 'anyone' } },
          { query: MY_FAVORITE_TASKS_QUERY, variables: { selector: 'me' } },
        ]}
      >
        {(manageTask, { error }) => (
          <StyledBtn
            onClick={() => {
              manageTask().catch(err => {
                alert(err.message);
              });
            }}
          >
            {this.props.children}
          </StyledBtn>
        )}
      </Mutation>
    );
  }
}

export default ManageFavorites;
