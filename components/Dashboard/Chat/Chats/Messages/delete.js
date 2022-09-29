import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Mutation } from '@apollo/client/react/components';
import styled from 'styled-components';

import { DELETE_MESSAGE } from '../../../../Mutations/Talk';

const StyledLeaveButton = styled.div`
  color: red;
  cursor: pointer;
`;

class DeleteMessage extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_MESSAGE}
        variables={{ id: this.props.messageId }}
        refetchQueries={this.props.refetchQueries}
      >
        {(deleteMessage, { loading, error }) => (
          <StyledLeaveButton
            onClick={() => {
              if (confirm('Are you sure you want to delete this message?')) {
                deleteMessage();
              }
            }}
          >
            <Icon name="trash" />
          </StyledLeaveButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteMessage;
