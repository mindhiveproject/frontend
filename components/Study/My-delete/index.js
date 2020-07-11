import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Center, StudiesList, StyledLink } from '../styles';
import StudyCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_STUDIES_QUERY = gql`
  query MY_STUDIES_QUERY {
    myStudies {
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
        <Link
          href={{
            pathname: '/studies/add',
          }}
        >
          <a>
            <button>
              <h2>Add new study</h2>
            </button>
          </a>
        </Link>
        <Query query={MY_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <StudiesList>
                {data.myStudies &&
                  data.myStudies.map(study => (
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
export { MY_STUDIES_QUERY };