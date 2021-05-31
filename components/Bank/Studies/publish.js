import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';

const StyledPublishBtn = styled.button`
  padding: 10px 5px 10px 5px;
  background: white;
  border: 2px solid green;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

const PUBLISH_TOGGLE_STUDY = gql`
  mutation PUBLISH_TOGGLE_STUDY($id: ID!) {
    publishStudyToggle(id: $id) {
      id
      slug
      public
    }
  }
`;

class PublishStudy extends Component {
  render() {
    const { id, isPublic } = this.props;
    return (
      <Mutation mutation={PUBLISH_TOGGLE_STUDY} variables={{ id }}>
        {(publishToggleStudy, { loading, error }) => (
          <StyledPublishBtn onClick={() => publishToggleStudy()}>
            {isPublic ? `Make private` : `Publish`}
          </StyledPublishBtn>
        )}
      </Mutation>
    );
  }
}

export default PublishStudy;
