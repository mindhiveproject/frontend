import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { StyledBank, StyledTaskCard } from '../styles';

import TaskCard from './taskcard';

const ALL_PARTICIPATED_TASKS_QUERY = gql`
  query ALL_PARTICIPATED_TASKS_QUERY($tasks: [ID!]) {
    tasks(where: { taskType: TASK, id_in: $tasks }) {
      id
      title
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      description
      taskType
    }
  }
`;

class ParticipatedTasksBank extends Component {
  render() {
    return (
      <>
        <Query
          query={ALL_PARTICIPATED_TASKS_QUERY}
          variables={{
            tasks:
              (this.props.user.tasksInfo &&
                Object.keys(this.props.user.tasksInfo)) ||
              [],
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            console.log('tasks', tasks);
            return (
              <StyledBank>
                <div className="tasks">
                  {tasks.map(task => (
                    <TaskCard key={task.id} task={task} redirect="p" />
                  ))}
                </div>
              </StyledBank>
            );
          }}
        </Query>
      </>
    );
  }
}

export default ParticipatedTasksBank;
