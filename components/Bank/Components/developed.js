import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import Link from 'next/link';
import styled from 'styled-components';
import { StyledBank, StyledStudyCard, StyledZeroState } from '../styles';
import Card from './card';

const MY_DEVELOPED_TASKS_QUERY = gql`
  query MY_DEVELOPED_TASKS_QUERY {
    myTasks(where: { taskType: TASK }) {
      id
      title
      slug
      description
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      taskType
    }
  }
`;

const MY_DEVELOPED_SURVEYS_QUERY = gql`
  query MY_DEVELOPED_SURVEYS_QUERY {
    myTasks(where: { taskType: SURVEY }) {
      id
      title
      slug
      description
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      taskType
    }
  }
`;

class DevelopedStudiesBank extends Component {
  render() {
    const { componentType } = this.props;
    const component = componentType === 'SURVEY' ? 'survey' : 'task';

    return (
      <>
        <Query
          query={
            componentType === 'SURVEY'
              ? MY_DEVELOPED_SURVEYS_QUERY
              : MY_DEVELOPED_TASKS_QUERY
          }
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const tasks = data.myTasks;
            if (tasks.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't developed a {component} yet.</h2>
                    <p>
                      Once you develop your {component} first, it will appear
                      here.
                    </p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <div className="studies">
                  {tasks.map(component => (
                    <Card
                      key={component.id}
                      component={component}
                      onSelectComponent={this.props.onSelectComponent}
                      user={this.props.user}
                      developingMode
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

export default DevelopedStudiesBank;
export { MY_DEVELOPED_TASKS_QUERY, MY_DEVELOPED_SURVEYS_QUERY };
