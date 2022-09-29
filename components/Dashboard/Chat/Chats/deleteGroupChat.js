import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { MY_TALKS_QUERY } from '../../../Queries/Talk';

const StyledLeaveButton = styled.div`
  color: red;
  cursor: pointer;
`;

const DELETE_GROUP_CHAT = gql`
  mutation DELETE_GROUP_CHAT($id: ID!) {
    deleteGroupChat(id: $id) {
      id
    }
  }
`;

class DeleteGroupChat extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_GROUP_CHAT}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: MY_TALKS_QUERY }]}
      >
        {(leaveGroupChat, { loading, error }) => (
          <StyledLeaveButton
            onClick={() => {
              if (
                confirm(
                  'All messages will be deleted. Are you sure you want to delete this group chat?'
                )
              ) {
                leaveGroupChat(this.props.id);
              }
            }}
          >
            <Icon name="close" />
          </StyledLeaveButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteGroupChat;
