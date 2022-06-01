import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { ExperimentWindow } from '../../../Labjs/preview';
import PostPrompt from './postprompt';
import styled from 'styled-components';

const StyledLinkWindow = styled.div`
  height: 90vh;
  padding: 2rem;
  display: grid;
  justify-items: center;
  align-content: center;
  line-height: 3rem;
  font-family: Lato;
  font-size: 1.5rem;
  font-weight: 400;
  color: #666666;
  .returnLink {
    margin: 4rem 0rem;
  }
`;

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
      taskType
      isExternal
    }
  }
`;

class TaskPreview extends Component {
  state = {
    resultsSaved: false,
  };

  saveResults = () => {

    if(!this.state.resultsSaved) {
      const { study } = this.props;
      const user = {
        ...this.props.user,
        results: [...this.props.user.results, {
          studyId: study.id,
          taskId: this.props.componentId,
          versionId: this.props.versionId
        }],
      }
      // find the id and version of the next task
      let components = [];
      if (
        study.components &&
        study.components.blocks &&
        study.components.blocks.length &&
        study.components.blocks[0].tests
      ) {
        // select the blocks for the specific user
        const userStudyInfo = user.studiesInfo[study.id];
        const userBlock = userStudyInfo.blockId;
        const studyBlock = study.components.blocks.filter(
          block => block.blockId === userBlock
        );
        if (studyBlock && studyBlock.length && studyBlock[0].tests) {
          components = studyBlock[0].tests;
        }
      } else {
        components = study.components;
      }
      const resultsInThisStudy =
        user?.results?
          .filter(
            result =>
              result.studyId === this.props.study.id
          )
          .map(result => result.versionId) || [];
      const notCompletedTasks = components.filter(
        task => !resultsInThisStudy.includes(task.testId)
      );
      if (notCompletedTasks && notCompletedTasks.length > 0) {
        user.nextTaskId = notCompletedTasks[0].id;
        user.nextVersionId = notCompletedTasks[0].testId;
      } else {
        user.nextTaskId = null;
        user.nextVersionId = null;
      }
      // update the user information
      this.props.onUpdateVirtualUser(user);

      this.setState({
        resultsSaved: true
      })

      this.props.proceedToPostPrompt();
    }

  }

  startTheTask = ({ componentId, versionId }) => {
    this.setState({
      resultsSaved: false
    });
    this.props.onStartTheTask({ componentId, versionId });
  }

  render() {
    const { user, componentId, handleFinish } = this.props;
    const { window } = this.props;
    const policy = 'preview';

    return (
      <Query query={TASK_QUERY} variables={{ id: componentId }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No task found for {componentId}</p>;
          const { task } = data;

          if (window === 'post') {
            return (
              <PostPrompt
                user={user}
                study={this.props.study}
                task={task}
                versionId={this.props.versionId}
                token={this.state.token}
                policy={policy}
                slug={this.props.study.slug}
                onClosePrompt={this.closePrompt}
                onStartTheTask={this.startTheTask}
                onEndTask={this.props.onEndTask}
                onUpdateVirtualUser={this.props.onUpdateVirtualUser}
              />
            );
          }

          if (window === 'task' && task?.template?.id) {
            return (
              <ExperimentWindow
                settings={{
                  script: task.template.script,
                  style: task.template.style,
                  params: task.parameters?.reduce((obj, item) => {
                    obj[item.name] = item.value;
                    return obj;
                  }, {}),
                  policy,
                  on_finish: ({ isInterrupted }) => {
                    if (isInterrupted) {
                      this.props.onEndTask();
                    } else {
                      this.saveResults();
                    }
                  },
                }}
              />
            );
          }

          if (task.isExternal && task.link) {
            return (
              <StyledLinkWindow>
                Please click the link below to participate in the{' '}
                {task.taskType.toLowerCase()}{' '}
                <strong>{task.title}</strong>{' '}
                <a href={task.link} target="_blank" rel="noreferrer">
                  {task.link}
                </a>

                <div className="returnLink">
                  <p
                    style={{ 'text-decoration': 'underline', cursor: 'pointer' }}
                    onClick={e => this.props.onEndTask()}
                  >
                    Go back to the main study page
                  </p>
                </div>

              </StyledLinkWindow>
            );
          }

          return <div>No task found</div>;
        }}
      </Query>
    );
  }
}

export default TaskPreview;
