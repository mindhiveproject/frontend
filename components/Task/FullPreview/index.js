import React, { Component } from 'react';
import Router from 'next/router';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { ExperimentWindow } from '../../Labjs/index';
import { StyledBox } from '../Run/styles';

import Qualtrics from '../../Qualtrics/preview';

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
      consent {
        id
        title
        studies {
          id
          title
        }
        tasks {
          id
          title
        }
      }
      taskType
    }
  }
`;

class RunExperiment extends Component {
  render() {
    const { id } = this.props;
    const redirect = this.props.redirect === 'p' ? 'participate' : 'discover';
    return (
      <Query query={TASK_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No template found for {id}</p>;
          const { task } = data;

          if (task.template && task.template.id) {
            return (
              <StyledBox>
                <ExperimentWindow
                  settings={{
                    template: task.template.id,
                    task: task.id,
                    script: task.template.script,
                    style: task.template.style,
                    params: task.parameters?.reduce((obj, item) => {
                      obj[item.name] = item.value;
                      return obj;
                    }, {}),
                    policy: 'preview',
                    eventCallback: e => {
                      // console.log('Event callback', e);
                    },
                    on_finish: token => {
                      Router.push({
                        pathname: `/dashboard/${redirect}`,
                        query: {
                          tab: task.taskType === 'SURVEY' ? 'surveys' : 'tasks',
                        },
                      });
                      // Router.push('/dashboard/discover');
                    },
                  }}
                />
              </StyledBox>
            );
          }
          if (task.link) {
            return <Qualtrics link={task.link} />;
          }
          return <div>No task found</div>;
        }}
      </Query>
    );
  }
}

export default RunExperiment;
export { TASK_QUERY };
