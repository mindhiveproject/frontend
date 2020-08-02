import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';
import Link from 'next/link';
import { Center, ExperimentsList, StyledCustomExperimentLine } from './styles';
import DeleteCustomExperiment from '../../Experiment/CustomDelete/index';
import ExperimentCard from '../../ExperimentCard/index';
import UpdateSettingsCustomExperiment from './updateSettings';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_PARAMETERS_QUERY = gql`
  query MY_PARAMETERS_QUERY {
    myParameters {
      id
      title
      data
      settings
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
        <h1>My research studies</h1>
        <Query query={MY_PARAMETERS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ExperimentsList>
                {data.myParameters.map(parameter => (
                  <StyledCustomExperimentLine
                    key={parameter.id}
                    className={
                      parameter.settings &&
                      parameter.settings.status &&
                      parameter.settings.status
                    }
                  >
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
                        query: { id: parameter.id, data: 'no' },
                      }}
                    >
                      <button>
                        <a>
                          <h2>Preview experiment</h2>
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
                      <h2>Delete experiment</h2>
                    </DeleteCustomExperiment>
                    <UpdateSettingsCustomExperiment
                      id={parameter.id}
                      settings={parameter.settings}
                    />
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
