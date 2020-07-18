import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import ClassCard from '../Card/index';
import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_CLASSES_QUERY = gql`
  query ALL_CLASSES_QUERY {
    classes {
      id
      title
      code
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
        <h1>All classes</h1>
        <NavigationButtons>
          <Link
            href={{
              pathname: '/classes/my',
            }}
          >
            <a>
              <button>
                <h2>My classes</h2>
              </button>
            </a>
          </Link>
        </NavigationButtons>
        <Query query={ALL_CLASSES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.classes.map(schoolclass => (
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
export { ALL_CLASSES_QUERY };
