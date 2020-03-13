import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from './styles';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ADD_RESULT_MUTATION } from '../../Results/Add/index';
import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';

class RunExperiment extends Component {
  render() {
    const { experimentId } = this.props;
    return (
      <Query query={REVIEW_EXPERIMENT_QUERY} variables={{ id: experimentId }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.experiment)
            return <p>No experiment found for {experimentId}</p>;
          const exp = data.experiment;
          console.log('exp', exp);
          return (
            <>
              <Head>
                <link href="/static/lab.css" rel="stylesheet" />
              </Head>
              <StyledBox>
                <Mutation
                  mutation={ADD_RESULT_MUTATION}
                  variables={{ experimentId }}
                  refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
                >
                  {addResult => (
                    <ExperimentWindow
                      settings={{
                        script: exp.title,
                        params: { iti: 1000 },
                        eventCallback: e => {
                          console.log('Event callback', e);
                        },
                        on_finish: json => {
                          console.log('json data', json);
                          addResult({ variables: { data: json } });
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
