import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from './styles';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ADD_RESULT_MUTATION } from '../../Results/Add/index';
import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';
import Qualtrics from '../../Qualtrics/index';

class RunExperiment extends Component {
  render() {
    const { experimentId, dataPolicy } = this.props;
    return (
      <Query query={REVIEW_EXPERIMENT_QUERY} variables={{ id: experimentId }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.experiment)
            return <p>No experiment found for {experimentId}</p>;
          const exp = data.experiment;
          console.log('exp', exp);
          if (exp.title === 'Qualtrics') return <Qualtrics />;
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
                        params: exp.parameters.reduce((obj, item) => {
                          obj[item.name] = item.value;
                          return obj;
                        }, {}),
                        eventCallback: e => {
                          console.log('Event callback', e);
                        },
                        on_finish: json => {
                          console.log('saving of data is deprecated here');
                          // console.log('json data', json);
                          // if (dataPolicy === 'no') {
                          //   console.log('Not saving any data in preview mode');
                          // } else {
                          //   addResult({
                          //     variables: { data: json, dataPolicy },
                          //   });
                          // }
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
