import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const PUBLISH_TOGGLE_TASK = gql`
  mutation PUBLISH_TOGGLE_TASK($id: ID!) {
    publishTaskToggle(id: $id) {
      id
      slug
      public
    }
  }
`;

class PublishTaskToggle extends Component {
  render() {
    const { id, isPublic } = this.props;
    return (
      <Mutation mutation={PUBLISH_TOGGLE_TASK} variables={{ id }}>
        {(publishToggleTask, { loading, error }) => (
          <button onClick={() => publishToggleTask()}>
            {isPublic ? `Make private` : `Publish`}
          </button>
        )}
      </Mutation>
    );
  }
}

export default PublishTaskToggle;
