import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { MY_TALKS_QUERY } from './chatsList';

const StyledLeaveButton = styled.div`
  color: red;
  cursor: pointer;
`;

const ADD_NEW_MEMBERS_TO_TALK = gql`
  mutation ADD_NEW_MEMBERS_TO_TALK($id: ID!) {
    leaveGroupChat(id: $id) {
      id
    }
  }
`;

class LeaveGroupChat extends Component {
  render() {
    return (
      <Mutation
        mutation={ADD_NEW_MEMBERS_TO_TALK}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: MY_TALKS_QUERY }]}
      >
        {(leaveGroupChat, { loading, error }) => (
          <StyledLeaveButton
            onClick={() => {
              if (confirm('Are you sure you want to leave this group chat?')) {
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

export default LeaveGroupChat;
