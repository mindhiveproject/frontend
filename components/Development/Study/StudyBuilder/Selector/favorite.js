import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import CardWrapper from './cardWrapper';

const StyledBank = styled.div`
  display: grid;
  .zeroState {
    display: grid;
    width: 100%;
    text-align: center;
    padding: 2rem 2rem;
    margin: 2rem 0rem;
  }
`;

export const MY_FAVORITE_TASKS_QUERY = gql`
  query MY_FAVORITE_TASKS_QUERY($selector: String!) {
    favoriteTasks(selector: $selector) {
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
      descriptionForParticipants
      taskType
      parameters
      template {
        id
        title
        description
        parameters
        script
        style
      }
      link
    }
  }
`;

class Tasks extends Component {
  render() {
    const { selector } = this.props;
    return (
      <>
        <Query query={MY_FAVORITE_TASKS_QUERY} variables={{ selector }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { favoriteTasks } = data;
            if (!favoriteTasks.length) {
              return (
                <StyledBank>
                  <div className="zeroState">
                    <h3>Explore the surveys and tasks above</h3>
                  </div>
                </StyledBank>
              );
            }
            return (
              <StyledBank>
                <div className="tasks">
                  {favoriteTasks.map(task => (
                    <CardWrapper
                      key={task.id}
                      component={task}
                      redirect="d"
                      onAddComponent={this.props.onAddComponent}
                      openTaskEditor={this.props.openTaskEditor}
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
