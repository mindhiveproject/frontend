import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import TaskPage from './page';

const REVIEW_TASK_QUERY = gql`
  query REVIEW_TASK_QUERY($slug: String!) {
    task(where: { slug: $slug }) {
      id
      title
      slug
      description
      descriptionForParticipants
      taskType
      public
      isOriginal
      isExternal
      author {
        username
      }
      collaborators {
        username
      }
      createdAt
      updatedAt
      settings
      parameters
    }
  }
`;

class TaskParticipantPage extends Component {
  render() {
    return (
      <Query query={REVIEW_TASK_QUERY} variables={{ slug: this.props.slug }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p></p>;
          if (!data.task)
            return <p>No task or survey found for {this.props.slug}</p>;
          const { task } = data;
          return <TaskPage task={task} />;
        }}
      </Query>
    );
  }
}

export default TaskParticipantPage;
export { REVIEW_TASK_QUERY };
