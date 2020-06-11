import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Center, StudiesList, StyledLink } from '../styles';
import StudyCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_STUDIES_QUERY = gql`
  query ALL_STUDIES_QUERY {
    studies {
      id
      title
      slug
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class MyStudies extends Component {
  render() {
    return (
      <Center>
        <h1>Studies</h1>
        <Query query={ALL_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <StudiesList>
                {data.studies.map(study => (
                  <StudyCard study={study} key={study.id} />
                ))}
              </StudiesList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default MyStudies;
export { ALL_STUDIES_QUERY };
