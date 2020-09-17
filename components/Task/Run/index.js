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
import PostPrompt from './postprompt';
// import Crossover from './crossover';

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
        organization
        info
        settings
        studies {
          id
          title
        }
        tasks {
          id
          title
        }
      }
    }
  }
`;

class RunExperiment extends Component {
  state = {
    activePage: this.props.isExternalTaskRunning ? 'post' : 'task',
    token: '',
  };

  closePrompt = () => {
    this.setState({
      activePage: 'task',
    });
  };

  render() {
    const { id, policy } = this.props;
    return (
      <Query query={TASK_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No template found for {id}</p>;
          const { task } = data;
          const me = this.props.user;

          if (this.state.activePage === 'task') {
            if (task.template && task.template.id) {
              return (
                <StyledBox>
                  <ExperimentWindow
                    settings={{
                      user: me.id,
                      template: task.template.id,
                      task: task.id,
                      study: this.props.study.id,
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
                      on_finish: token => {
                        if (policy === 'preview' || !token) {
                          console.log('90 token', token);
                          // if (this.props.slug) {
                          //   Router.push(
                          //     '/studies/[slug]',
                          //     `/studies/${this.props.slug}`
                          //   );
                          //   return;
                          // }
                          // Router.push('/task/my');
                          // return;
                          alert('TO DO - where to come back after preview?');
                        }
                        this.setState({
                          token,
                          activePage: 'post',
                        });
                      },
                    }}
                  />
                </StyledBox>
              );
            }
            if (task.link) {
              return <Qualtrics link={task.link} user={me} />;
            }
          }

          if (this.state.activePage === 'post') {
            return (
              <PostPrompt
                user={me}
                study={this.props.study}
                task={task}
                token={this.state.token}
                policy={policy}
                slug={this.props.study.slug}
                onClosePrompt={this.closePrompt}
                onStartTheTask={this.props.onStartTheTask}
                onEndTask={this.props.onEndTask}
              />
            );
          }

          return <div>No task found</div>;
        }}
      </Query>
    );
  }
}

export default RunExperiment;
export { TASK_QUERY };
