import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';

import { StyledBank, StyledTaskCard, StyledZeroState } from '../styles';
import Card from './card';

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

const ALL_PARTICIPATED_SURVEYS_QUERY = gql`
  query ALL_PARTICIPATED_SURVEYS_QUERY($tasks: [ID!]) {
    tasks(where: { taskType: SURVEY, id_in: $tasks }) {
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
    const { componentType } = this.props;
    const component = componentType === 'SURVEY' ? 'survey' : 'task';

    return (
      <>
        <Query
          query={
            componentType === 'SURVEY'
              ? ALL_PARTICIPATED_SURVEYS_QUERY
              : ALL_PARTICIPATED_TASKS_QUERY
          }
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
            if (tasks.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't participated in any {component} yet.</h2>
                    <p>
                      <span>See </span>
                      <Link
                        href={{
                          pathname: '/dashboard/discover',
                        }}
                      >
                        <span
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          Discover
                        </span>
                      </Link>
                      <span> to browse our database.</span>
                    </p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <div className="tasks">
                  {tasks.map(component => (
                    <Card
                      key={component.id}
                      component={component}
                      user={this.props.user}
                      redirect="p"
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

export default ParticipatedTasksBank;
