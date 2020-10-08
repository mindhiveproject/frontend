import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import styled from 'styled-components';
import Card from './card';

const StyledBank = styled.div`
  display: grid;
`;

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
      parameters
      template {
        id
        title
        description
        parameters
        script
        style
      }
    }
  }
`;

class Tasks extends Component {
  render() {
    return (
      <>
        <Query query={ALL_PUBLIC_TASKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            return (
              <StyledBank>
                <div className="tasks">
                  {tasks.map(task => (
                    <Card
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
