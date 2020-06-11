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
      parameters
      settings
      updatedAt
      template {
        title
        id
        script
        style
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
          // console.log('data', data.parameter);
          return (
            <EditTaskForm
              id={data.task.id}
              template={data.task.template}
              parameters={data.task.parameters}
              title={data.task.title}
              settings={data.task.settings}
            />
          );
        }}
      </Query>
    );
  }
}

export default EditParameter;
