import React, { Component } from 'react';
import { Query } from 'react-apollo';
// import { TASK_QUERY } from '../Run/index';
import gql from 'graphql-tag';

import EditTaskForm from './editTaskForm';

// write a query here, later refactor it in a separate file if it is used elsewhere
const TASK_QUERY = gql`
  query TASK_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      description
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
      collaborators {
        id
        username
      }
    }
  }
`;

class EditParameter extends Component {
  render() {
    return (
      <Query query={TASK_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          console.log('data', data);
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.id}</p>;
          let settings = {};
          if (data.task.settings) {
            settings = data.task.settings;
          }
          if (Object.keys(settings).length === 0) {
            settings = {
              duration: '',
              descriptionBefore: '',
              descriptionAfter: '',
            };
          }
          // console.log('data', data.parameter);
          return (
            <EditTaskForm
              id={data.task.id}
              template={data.task.template}
              parameters={data.task.parameters}
              title={data.task.title}
              description={data.task.description}
              link={data.task.link}
              settings={settings}
              collaborators={data.task.collaborators}
            />
          );
        }}
      </Query>
    );
  }
}

export default EditParameter;
export { TASK_QUERY };
