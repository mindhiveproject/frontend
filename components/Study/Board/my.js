import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
// import { Center, StudiesList, StyledLink } from '../styles';
import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';

import StudyCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_STUDIES_QUERY = gql`
  query MY_STUDIES_QUERY {
    myStudies {
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
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class MyStudies extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>My studies</h1>
        <NavigationButtons>
          <Link
            href={{
              pathname: '/study/add',
            }}
          >
            <a>
              <button>
                <h2>Add new study</h2>
              </button>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/study/all',
            }}
          >
            <a>
              <button>
                <h2>Public studies</h2>
              </button>
            </a>
          </Link>
        </NavigationButtons>
        <Query query={MY_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.myStudies &&
                  data.myStudies.map(study => (
                    <StudyCard study={study} key={study.id} />
                  ))}
              </List>
            );
          }}
        </Query>
      </StyledBoard>
    );
  }
}

export default MyStudies;
export { MY_STUDIES_QUERY };
