import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import TaskReview from './TaskRender/wrapper';
import ExternalTask from './TaskRender/external';

const GET_TASK_QUERY = gql`
  query GET_TASK_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      parameters
      settings
      updatedAt
      link
      template {
        title
        id
        script
        style
      }
      consent {
        id
        title
        organization
        info
        settings
        studies {
          id
          title
        }
        tasks {
          id
          title
        }
      }
      taskType
      isExternal
    }
  }
`;

class TaskPage extends Component {
  render() {
    const { study, user, id } = this.props;
    return (
      <Query query={GET_TASK_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No template found for {id}</p>;
          const { task } = data;
          const { parameters, template } = task;

          if (task.isExternal) {
            return (
              <ExternalTask task={task} onEndTask={this.props.onEndTask} />
            );
          }

          return (
            <TaskReview
              user={user}
              study={study}
              taskId={id}
              parameters={parameters}
              template={template}
              onEndTask={this.props.onEndTask}
              policy={this.props.policy}
            />
          );
        }}
      </Query>
    );
  }
}

export default TaskPage;
