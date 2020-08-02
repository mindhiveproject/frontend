import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from './styles';
import {
  CURRENT_USER_RESULTS_QUERY,
  CURRENT_USER_QUERY,
} from '../../User/index';

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
                <Query query={CURRENT_USER_QUERY}>
                  {({ data, loading }) => {
                    const params = exp.parameters.reduce((obj, item) => {
                      debugger;
                      console.log('obj', obj);
                      obj[item.name] = item.value;
                      return obj;
                    }, {});
                    return (
                      <ExperimentWindow
                        settings={{
                          user: data && data.me && data.me.id,
                          experiment: experimentId,
                          script: exp.script,
                          style: exp.style,
                          params,
                          policy: dataPolicy,
                          eventCallback: e => {
                            console.log('Event callback', e);
                          },
                          on_finish: () => {
                            console.log('saving of data is deprecated here');
                            Router.push('/bank');
                          },
                        }}
                      />
                    );
                  }}
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
