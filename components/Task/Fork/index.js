import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ForkTaskForm from './forkTaskForm';

const TASK_FORK_QUERY = gql`
  query TASK_FORK_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      description
      parameters
      settings
      updatedAt
      link
      template {
        id
        title
        description
        parameters
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

class ForkTask extends Component {
  render() {
    return (
      <Query query={TASK_FORK_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task template found for id {this.props.id}</p>;
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
          return (
            <ForkTaskForm
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

export default ForkTask;
