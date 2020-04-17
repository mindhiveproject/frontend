import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';
import Link from 'next/link';
import { Center, ExperimentsList, StyledCustomExperimentLine } from './styles';

// TODO finish this component
// get all public custom experiments for this original experiment (id)

// write a query here, later refactor it in a separate file if it is used elsewhere
const PUBLIC_PARAMETERS_QUERY = gql`
  query PUBLIC_PARAMETERS_QUERY {
    publicParameters {
      id
      title
      data
      updatedAt
      experiment {
        id
      }
      author {
        id
      }
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class PublicCustomExperiments extends Component {
  render() {
    return (
      <Center>
        <h1>Experiments</h1>
        <Query query={PUBLIC_PARAMETERS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ExperimentsList>
                {data.parameters.map(parameter => (
                  <StyledCustomExperimentLine key={parameter.id}>
                    <Link
                      href={{
                        pathname: '/custom',
                        query: { id: parameter.id },
                      }}
                    >
                      <a>
                        <h1>{parameter.title}</h1>
                      </a>
                    </Link>
                    <p>{moment(parameter.updatedAt).fromNow()}</p>
                    <Link
                      href={{
                        pathname: '/custom',
                        query: { id: parameter.id },
                      }}
                    >
                      <button>
                        <a>
                          <h2>Go to experiment page</h2>
                        </a>
                      </button>
                    </Link>
                    <Link
                      href={{
                        pathname: '/e',
                        query: { id: parameter.id },
                      }}
                    >
                      <button>
                        <a>
                          <h2>Participate in experiment</h2>
                        </a>
                      </button>
                    </Link>
                  </StyledCustomExperimentLine>
                ))}
              </ExperimentsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default PublicCustomExperiments;
export { PUBLIC_PARAMETERS_QUERY };
