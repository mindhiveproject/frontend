import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';

import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';

import TaskCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_TASKS_QUERY = gql`
  query MY_TASKS_QUERY {
    myTasks {
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
        <h1>My tasks</h1>
        <NavigationButtons>
          <Link
            href={{
              pathname: '/task/addlink',
            }}
          >
            <a>
              <button>
                <h2>Add a task with an external web link</h2>
              </button>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/task/all',
            }}
          >
            <a>
              <button>
                <h2>Public tasks</h2>
              </button>
            </a>
          </Link>
        </NavigationButtons>
        <Query query={MY_TASKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.myTasks &&
                  data.myTasks.map(task => (
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
export { MY_TASKS_QUERY };
