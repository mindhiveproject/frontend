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

import Qualtrics from '../../Qualtrics/redirect';

// write a query here, later refactor it in a separate file if it is used elsewhere
const TASK_QUERY = gql`
  query TASK_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      parameters
      settings
      updatedAt
      link
      template {
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
    const { id, policy } = this.props;
    return (
      <Query query={TASK_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No template found for {id}</p>;
          const { task } = data;
          console.log('task', task);
          return (
            <>
              <StyledBox>
                <Query query={CURRENT_USER_RESULTS_QUERY}>
                  {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading</p>;
                    if (!data.me) return <p>No user found</p>;
                    const { me } = data;
                    if (task.template && task.template.id) {
                      return (
                        <ExperimentWindow
                          settings={{
                            user: me.id,
                            template: task.template.id,
                            task: task.id,
                            study: this.props.study,
                            script: task.template.script,
                            style: task.template.style,
                            params: task.parameters.reduce((obj, item) => {
                              obj[item.name] = item.value;
                              return obj;
                            }, {}),
                            policy,
                            eventCallback: e => {
                              console.log('Event callback', e);
                            },
                            on_finish: json => {
                              if (this.props.slug) {
                                window.location.href = `/study/${this.props.slug}`;
                              } else {
                                window.location.href = `/studies/all`;
                              }
                            },
                          }}
                        />
                      );
                    }
                    if (task.link) {
                      return <Qualtrics link={task.link} user={me} />;
                    }
                    return <div>No task found</div>;
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
export { TASK_QUERY };
