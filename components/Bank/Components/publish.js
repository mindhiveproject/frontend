import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

const PUBLISH_TOGGLE_TASK = gql`
  mutation PUBLISH_TOGGLE_TASK($id: ID!) {
    publishTaskToggle(id: $id) {
      id
      slug
      public
    }
  }
`;

const StyledPublishBtn = styled.button`
  padding: 10px 5px 10px 5px;
  background: white;
  border: 2px solid green;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

class PublishTaskToggle extends Component {
  render() {
    const { id, isPublic } = this.props;
    return (
      <Mutation mutation={PUBLISH_TOGGLE_TASK} variables={{ id }}>
        {(publishToggleTask, { loading, error }) => (
          <StyledPublishBtn
            id="publishButton"
            onClick={() => publishToggleTask()}
          >
            {isPublic ? `Make private` : `Publish`}
          </StyledPublishBtn>
        )}
      </Mutation>
    );
  }
}

export default PublishTaskToggle;
