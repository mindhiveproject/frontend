import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';
// import { Center, StudiesList, StyledLink } from '../styles';
import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';
import StudyCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_STUDIES_QUERY = gql`
  query ALL_STUDIES_QUERY {
    studies {
      id
      title
      slug
      author {
        id
      }
      collaborators {
        id
      }
      public
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-@apollo/client/react/components-2-1-199e9e2bd01e
class AllStudies extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>Studies</h1>
        <Query query={ALL_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.studies.map(study => (
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

export default AllStudies;
export { ALL_STUDIES_QUERY };
