import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledBank, StyledTaskCard } from '../styles';

import Card from './card';

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

const ALL_PUBLIC_SURVEYS_QUERY = gql`
  query ALL_PUBLIC_SURVEYS_QUERY {
    tasks(where: { taskType: SURVEY }) {
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
    const { componentType } = this.props;
    const component = componentType === 'SURVEY' ? 'survey' : 'task';

    return (
      <>
        <Query
          query={
            componentType === 'SURVEY'
              ? ALL_PUBLIC_SURVEYS_QUERY
              : ALL_PUBLIC_TASKS_QUERY
          }
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            return (
              <StyledBank>
                <div className="tasks">
                  {tasks.map(component => (
                    <Card
                      key={component.id}
                      component={component}
                      redirect="d"
                      participateMode
                    />
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
