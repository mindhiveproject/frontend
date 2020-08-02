import React, { Component } from 'react';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from './styles';
import {
  CURRENT_USER_RESULTS_QUERY,
  CURRENT_USER_QUERY,
} from '../../User/index';
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
        script
        style
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
                <Query query={CURRENT_USER_QUERY}>
                  {({ data, loading }) => (
                    <ExperimentWindow
                      settings={{
                        user: data && data.me && data.me.id,
                        experiment: parameter.experiment.id,
                        customExperiment: parameter.id,
                        script: parameter.experiment.script,
                        style: parameter.experiment.style,
                        params: parameter.data.reduce((obj, item) => {
                          obj[item.name] = item.value;
                          return obj;
                        }, {}),
                        policy: dataPolicy,
                        eventCallback: e => {
                          console.log('Event callback', e);
                        },
                        on_finish: json => {
                          console.log('saving of data is deprecated here');
                          Router.push('/bank');
                        },
                      }}
                    />
                  )}
                </Query>
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
