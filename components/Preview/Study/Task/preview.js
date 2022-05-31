import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { ExperimentWindow } from '../../../Labjs/preview';

// write a query here, later refactor it in a separate file if it is used elsewhere
const TASK_QUERY = gql`
  query TASK_QUERY($id: ID!) {
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

class TaskPreview extends Component {
  render() {
    const { user, componentId, handleFinish } = this.props;
    return (
      <Query query={TASK_QUERY} variables={{ id: componentId }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No task found for {componentId}</p>;
          const { task } = data;

          return (
            <ExperimentWindow
              settings={{
                script: task.template.script,
                style: task.template.style,
                params: task.parameters?.reduce((obj, item) => {
                  obj[item.name] = item.value;
                  return obj;
                }, {}),
                policy: 'preview',
                on_finish: () => {
                  handleFinish();
                },
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default TaskPreview;
