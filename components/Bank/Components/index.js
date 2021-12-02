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
      descriptionForParticipants
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
      descriptionForParticipants
      taskType
    }
  }
`;

const ALL_PUBLIC_COMPONENTS_QUERY = gql`
  query ALL_PUBLIC_COMPONENTS_QUERY {
    tasks {
      id
      title
      slug
      taskType
      author {
        id
      }
      collaborators {
        id
      }
    }
  }
`;

class TasksBank extends Component {
  render() {
    const { componentType, user, redirect } = this.props;
    let bankQuery;
    switch (componentType) {
      case 'COMPONENTS':
        bankQuery = ALL_PUBLIC_COMPONENTS_QUERY;
        break;
      case 'SURVEY':
        bankQuery = ALL_PUBLIC_SURVEYS_QUERY;
        break;
      case 'TASK':
        bankQuery = ALL_PUBLIC_TASKS_QUERY;
        break;
      default:
        console.error('No query specified');
    }

    return (
      <>
        <Query query={bankQuery}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            return (
              <StyledBank>
                <p>
                  <a
                    target="_blank"
                    href="https://docs.google.com/document/d/1PjobN7C3LUDuiFUanZd7BuTGYRf5zq9t_CUGGKQjLyM/edit?usp=sharing"
                  >
                    Tasks and Surveys descriptions
                  </a>
                </p>
                <div className="tasks">
                  {tasks.map(component => (
                    <Card
                      user={user}
                      key={component.id}
                      component={component}
                      redirect={redirect}
                      participateMode
                      isFavorite={user?.favoriteTasks
                        ?.map(task => task?.id)
                        .includes(component?.id)}
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
