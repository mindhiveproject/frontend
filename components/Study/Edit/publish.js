import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

const PUBLISH_TOGGLE_STUDY = gql`
  mutation PUBLISH_TOGGLE_STUDY($id: ID!) {
    publishStudyToggle(id: $id) {
      id
      slug
      public
    }
  }
`;

class PublishStudyToggle extends Component {
  render() {
    const { id, isPublic } = this.props;
    return (
      <Mutation mutation={PUBLISH_TOGGLE_STUDY} variables={{ id }}>
        {(publishToggleStudy, { loading, error }) => (
          <button onClick={() => publishToggleStudy()}>
            {isPublic ? `Make private` : `Publish`}
          </button>
        )}
      </Mutation>
    );
  }
}

export default PublishStudyToggle;
