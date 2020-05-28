import React, { Component } from 'react';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from './styles';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ADD_RESULT_MUTATION } from '../../Results/Add/index';
import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';

// write a query here, later refactor it in a separate file if it is used elsewhere
const CUSTOM_PARAMETER_QUERY = gql`
  query CUSTOM_PARAMETER_QUERY($id: ID!) {
    parameter(where: { id: $id }) {
      id
      title
      data
      settings
      updatedAt
      experiment {
        title
        id
      }
    }
  }
`;

class RunExperiment extends Component {
  render() {
    const { id, dataPolicy } = this.props;
    return (
      <Query query={CUSTOM_PARAMETER_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.parameter) return <p>No experiment found for {id}</p>;
          const { parameter } = data;
          console.log('parameter', parameter);
          return (
            <>
              <StyledBox>
                <Mutation
                  mutation={ADD_RESULT_MUTATION}
                  variables={{ experimentId: parameter.experiment.id }}
                  refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
                >
                  {addResult => (
                    <ExperimentWindow
                      settings={{
                        experiment: parameter.experiment.id,
                        customExperiment: parameter.id,
                        script: parameter.experiment.title,
                        params: parameter.data.reduce((obj, item) => {
                          obj[item.name] = item.value;
                          return obj;
                        }, {}),
                        eventCallback: e => {
                          console.log('Event callback', e);
                        },
                        on_finish: json => {
                          console.log('json data', json);
                          if (dataPolicy === 'no') {
                            console.log('Not saving any data in preview mode');
                          } else {
                            addResult({
                              variables: { data: json, dataPolicy },
                            });
                          }
                          Router.push('/bank');
                        },
                      }}
                    />
                  )}
                </Mutation>
              </StyledBox>
            </>
          );
        }}
      </Query>
    );
  }
}

export default RunExperiment;
export { CUSTOM_PARAMETER_QUERY };
