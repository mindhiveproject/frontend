import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import CardWrapper from './cardWrapper';

const StyledBank = styled.div`
  display: grid;
`;

const MY_TASKS_QUERY = gql`
  query MY_TASKS_QUERY {
    myTasks(where: { taskType: TASK }) {
      id
      title
      subtitle
      descriptionForParticipants
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      taskType
      parameters
      settings
      template {
        id
        title
        description
        parameters
        script
        style
      }
      link
      image
    }
  }
`;

class MyTasks extends Component {
  render() {
    return (
      <>
        <Query query={MY_TASKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const tasks = data.myTasks;
            return (
              <StyledBank>
                <div className="tasks">
                  {tasks.map(task => (
                    <CardWrapper
                      {...this.props}
                      key={task.id}
                      component={task}
                      redirect="d"
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

export default MyTasks;
export { MY_TASKS_QUERY };
