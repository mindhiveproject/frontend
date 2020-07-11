import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import ClassCard from '../Card/index';
import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_CLASSES_QUERY = gql`
  query MY_CLASSES_QUERY {
    myClasses {
      id
      title
      description
      creator {
        id
        username
      }
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class Classes extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>My classes</h1>
        <NavigationButtons>
          <Link
            href={{
              pathname: '/classes/add',
            }}
          >
            <a>
              <button>
                <h2>Add new class</h2>
              </button>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/classes/all',
            }}
          >
            <a>
              <button>
                <h2>All classes</h2>
              </button>
            </a>
          </Link>
        </NavigationButtons>
        <Query query={MY_CLASSES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.myClasses.map(schoolclass => (
                  <ClassCard schoolclass={schoolclass} key={schoolclass.id} />
                ))}
              </List>
            );
          }}
        </Query>
      </StyledBoard>
    );
  }
}

export default Classes;
export { MY_CLASSES_QUERY };
