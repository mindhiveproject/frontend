import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import { Center, TasksList, StyledLink } from '../styles';
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
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class MyTasks extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>Public tasks</h1>
        <Query query={ALL_TASKS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
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
