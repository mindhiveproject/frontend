import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { MY_CLASSES_QUERY } from '../../Dashboard/Classes/classes';

const DELETE_CLASS_MUTATION = gql`
  mutation DELETE_CLASS_MUTATION($id: ID!) {
    deleteClass(id: $id) {
      id
    }
  }
`;

const StyledButton = styled.button`
  display: grid;
  align-content: center;
  max-width: 200px;
  width: 100%;
  background: none;
  color: #007c70;
  padding: 12px 15px;
  border: 2px solid #007c70;
  border-radius: 4px;
  cursor: pointer;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-align: center;
`;

class DeleteClass extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_CLASS_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: MY_CLASSES_QUERY }]}
      >
        {(deleteClass, { error }) => (
          <StyledButton
            onClick={() => {
              if (confirm('Are you sure you want to delete this class?')) {
                deleteClass().catch(err => {
                  alert(err.message);
                });
                // redirect back
                if (this.props.redirect) {
                  this.props.redirectFunction();
                }
              }
            }}
          >
            {this.props.children}
          </StyledButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteClass;
