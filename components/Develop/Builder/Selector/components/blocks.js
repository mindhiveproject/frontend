import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import CardWrapper from './cardWrapper';

const StyledBank = styled.div`
  display: grid;
`;

const ALL_PUBLIC_BLOCKS_QUERY = gql`
  query ALL_PUBLIC_BLOCKS_QUERY {
    tasks(where: { taskType: BLOCK }) {
      id
      title
      subtitle
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
      descriptionForParticipants
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

class Tasks extends Component {
  render() {
    return (
      <>
        <Query query={ALL_PUBLIC_BLOCKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
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

export default Tasks;
