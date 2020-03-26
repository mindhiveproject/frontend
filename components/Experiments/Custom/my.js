import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';
import Link from 'next/link';
import { Center, ExperimentsList } from './styles';
import DeleteCustomExperiment from '../../Experiment/CustomDelete/index';
import ExperimentCard from '../../ExperimentCard/index';

const StyledCustomExperimentLine = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  border: 1px solid grey;
  padding: 10px;
  align-items: center;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_PARAMETERS_QUERY = gql`
  query MY_PARAMETERS_QUERY {
    myParameters {
      id
      title
      data
      updatedAt
      experiment {
        id
      }
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class CustomExperiments extends Component {
  render() {
    return (
      <Center>
        <h1>My experiments</h1>
        <Query query={MY_PARAMETERS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ExperimentsList>
                {data.myParameters.map(parameter => (
                  <StyledCustomExperimentLine key={parameter.id}>
                    <h1>{parameter.title}</h1>
                    <p>{moment(parameter.updatedAt).fromNow()}</p>
                    <Link
                      href={{
                        pathname: '/e',
                        query: { id: parameter.id },
                      }}
                    >
                      <button>
                        <a>
                          <h2>Run experiment</h2>
                        </a>
                      </button>
                    </Link>
                    <Link
                      href={{
                        pathname: '/edit',
                        query: { id: parameter.id },
                      }}
                    >
                      <button>
                        <a>
                          <h2>Edit experiment</h2>
                        </a>
                      </button>
                    </Link>
                    <DeleteCustomExperiment id={parameter.id}>
                      Delete
                    </DeleteCustomExperiment>
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

export default CustomExperiments;
export { MY_PARAMETERS_QUERY };
