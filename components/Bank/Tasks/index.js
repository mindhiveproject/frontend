import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { StyledBank, StyledTaskCard } from '../styles';

import TaskCard from './taskcard';

const ALL_PUBLIC_TASKS_QUERY = gql`
  query ALL_PUBLIC_TASKS_QUERY {
    tasks(where: { taskType: TASK }) {
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

class TasksBank extends Component {
  render() {
    return (
      <>
        <Query query={ALL_PUBLIC_TASKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            console.log('tasks', tasks);
            return (
              <StyledBank>
                <div className="tasks">
                  {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
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

export default TasksBank;
