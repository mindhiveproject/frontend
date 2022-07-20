import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import CardWrapper from './cardWrapper';

const StyledBank = styled.div`
  display: grid;
  .zeroState {
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    text-align: center;
    padding: 3rem 3rem;
    margin: 2rem 0rem;
    background: #f2f2f2;
    border-radius: 4px;
    h1 {
      font-family: Lato;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 29px;
      letter-spacing: 0.05em;
      text-align: center;
    }
    p {
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }
`;

export const MY_FAVORITE_TASKS_QUERY = gql`
  query MY_FAVORITE_TASKS_QUERY($selector: String!) {
    favoriteTasks(selector: $selector) {
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
                    <h1>
                      You haven’t added any surveys or tasks to your Favorites
                      yet.
                    </h1>
                    <p>
                      Once you have added a survey or task to your "favorites",
                      it will appear here. Go to Discover or the tabs above to
                      explore public surveys and tasks.
                    </p>
                  </div>
                </StyledBank>
              );
            }
            return (
              <StyledBank>
                <div className="tasks">
                  {favoriteTasks.map(task => (
                    <CardWrapper
                      {...this.props}
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
