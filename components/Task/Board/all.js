import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { StyledBoard, List, StyledLink } from '../../Styles/Boards';

import TaskCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_TASKS_QUERY = gql`
  query ALL_TASKS_QUERY {
    tasks {
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
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-@apollo/client/react/components-2-1-199e9e2bd01e
class MyTasks extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>Public tasks</h1>
        <Query query={ALL_TASKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.tasks.map(task => (
                  <TaskCard task={task} key={task.id} />
                ))}
              </List>
            );
          }}
        </Query>
      </StyledBoard>
    );
  }
}

export default MyTasks;
export { ALL_TASKS_QUERY };
