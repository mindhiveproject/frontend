import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { MY_DEVELOPED_COMPONENTS_QUERY } from './developed';
import { USER_DASHBOARD_QUERY } from '../../Queries/User';

const StyledDeleteBtn = styled.button`
  padding: 10px 5px 10px 5px;
  background: white;
  border: 2px solid red;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

const DELETE_TASK_MUTATION = gql`
  mutation DELETE_TASK_MUTATION($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

class DeleteComponent extends Component {
  render() {
    const componentType = this.props.taskType.toLowerCase();
    return (
      <Mutation
        mutation={DELETE_TASK_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[
          { query: USER_DASHBOARD_QUERY },
          {
            query: MY_DEVELOPED_COMPONENTS_QUERY,
            variables: { taskType: this.props.taskType },
          },
        ]}
      >
        {(deleteTask, { error }) => (
          <StyledDeleteBtn
            onClick={() => {
              if (
                confirm(
                  `Are you sure you want to delete this ${componentType}?`
                )
              ) {
                deleteTask().catch(err => {
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

export default DeleteComponent;
