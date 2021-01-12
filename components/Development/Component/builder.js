import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import styled from 'styled-components';
import EditPane from './editPane';
import PreviewPane from './previewPane';

import PreviewInBuilder from '../../Task/PreviewInBuilder/index';

import { MY_SURVEYS_QUERY } from '../Study/Selector/mySurveys';
import { MY_TASKS_QUERY } from '../Study/Selector/myTasks';
import { USER_DASHBOARD_QUERY } from '../../User/index';
import { COMPONENT_QUERY } from '../Study/Preview/componentPane';
import { COMPONENT_TO_CLONE_QUERY } from './builderWrapper';

import {
  MY_DEVELOPED_TASKS_QUERY,
  MY_DEVELOPED_SURVEYS_QUERY,
} from '../../Bank/Components/developed';

import {
  StyledBuilder,
  BuilderNav,
  StyledEditPane,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

const CREATE_COMPONENT = gql`
  mutation CREATE_COMPONENT(
    $title: String!
    $slug: String
    $templateId: ID!
    $description: String
    $parameters: Json
    $settings: Json
    $collaborators: [String]
    $consent: ID
    $taskType: TaskType
    $submitForPublishing: Boolean
  ) {
    createTask(
      title: $title
      slug: $slug
      templateId: $templateId
      description: $description
      parameters: $parameters
      settings: $settings
      collaborators: $collaborators
      consent: $consent
      taskType: $taskType
      submitForPublishing: $submitForPublishing
    ) {
      id
      title
      slug
      description
      parameters
      settings
      updatedAt
      link
      author {
        id
      }
      template {
        id
        title
        description
        parameters
        script
        style
      }
      collaborators {
        id
        username
      }
      consent {
        id
        title
      }
      taskType
      public
      submitForPublishing
    }
  }
`;

const UPDATE_COMPONENT = gql`
  mutation UPDATE_COMPONENT(
    $id: ID!
    $title: String
    $slug: String
    $description: String
    $parameters: Json
    $settings: Json
    $link: String
    $collaborators: [String]
    $consent: ID
    $taskType: TaskType
    $submitForPublishing: Boolean
  ) {
    updateTask(
      id: $id
      title: $title
      slug: $slug
      description: $description
      parameters: $parameters
      settings: $settings
      link: $link
      collaborators: $collaborators
      consent: $consent
      taskType: $taskType
      submitForPublishing: $submitForPublishing
    ) {
      id
      title
    }
  }
`;

class ComponentBuilder extends Component {
  state = {
    task: { ...this.props.task },
    needToClone: this.props.needToClone,
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  handleComponentChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      task: {
        ...this.state.task,
        [name]: value,
      },
    });
  };

  handleParamChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      task: {
        ...this.state.task,
        parameters: this.state.task.parameters.map(el =>
          el.name === name ? { ...el, value: val } : el
        ),
      },
    });
  };

  handleSettingsChange = e => {
    const { name } = e.target;
    const { value } = e.target;
    const settings = { ...this.state.task.settings };
    settings[name] = value;
    this.setState({
      task: {
        ...this.state.task,
        settings,
      },
    });
  };

  handleSetState = (name, value) => {
    this.setState({
      task: {
        ...this.state.task,
        [name]: value,
      },
    });
  };

  handleSetMultipleValuesInState = values => {
    this.setState({
      task: {
        ...this.state.task,
        ...values,
      },
    });
  };

  handleCollaboratorsChange = e => {
    const { name, value } = e.target;
    const collaborators = [...this.state.task.collaborators];
    collaborators[name] = value;
    if (name == collaborators.length - 1) {
      collaborators.push('');
    }
    this.setState({
      task: {
        ...this.state.task,
        collaborators,
      },
    });
  };

  createNewComponent = async createComponentMutation => {
    const res = await createComponentMutation({
      variables: {
        ...this.state.task,
      },
    });
    const myTask = res.data.createTask;
    this.setState({
      needToClone: false,
      task: {
        ...myTask,
        consent: myTask.consent?.id,
        collaborators: (myTask.collaborators &&
          myTask.collaborators.map(c => c.username).length &&
          myTask.collaborators.map(c => c.username)) || [''],
      },
    });
  };

  updateMyComponent = async updateComponentMutation => {
    const res = await updateComponentMutation({
      variables: {
        ...this.state.task,
      },
    });
  };

  render() {
    const { user } = this.props;
    const { task, needToClone } = this.state;
    const isAuthor =
      user.id === task?.author?.id ||
      task?.collaborators.includes(user.username);
    const taskType = task?.taskType === 'TASK' ? 'Task' : 'Survey';

    return (
      <>
        {!this.state.showPreview && (
          <StyledBuilderPage>
            <BuilderNav>
              <div className="goBackBtn" onClick={this.props.onLeave}>
                ← Leave {taskType} Editor
              </div>
              <div className="taskTitle">
                <p>{this.state.task.title}</p>
              </div>

              <div className="saveBtn">
                <button onClick={this.togglePreview}>Fullscreen Preview</button>

                {isAuthor && !needToClone ? (
                  <div>
                    <Mutation
                      mutation={UPDATE_COMPONENT}
                      refetchQueries={[
                        {
                          query: COMPONENT_QUERY,
                          variables: {
                            id: this.state.task.id,
                          },
                        },
                        {
                          query: COMPONENT_TO_CLONE_QUERY,
                          variables: {
                            id: this.state.task.id,
                          },
                        },
                      ]}
                    >
                      {(updateTask, { loading, error }) => (
                        <div>
                          <button
                            className="secondaryBtn"
                            onClick={() => {
                              this.updateMyComponent(updateTask);
                            }}
                          >
                            {loading ? 'Saving' : 'Save'}
                          </button>
                        </div>
                      )}
                    </Mutation>
                  </div>
                ) : (
                  <div>
                    <Mutation
                      mutation={CREATE_COMPONENT}
                      refetchQueries={[
                        { query: MY_SURVEYS_QUERY },
                        { query: MY_TASKS_QUERY },
                        { query: USER_DASHBOARD_QUERY },
                        { query: MY_DEVELOPED_TASKS_QUERY },
                        { query: MY_DEVELOPED_SURVEYS_QUERY },
                      ]}
                    >
                      {(createTask, { loading, error }) => (
                        <div>
                          <button
                            className="secondaryBtn"
                            onClick={() => {
                              this.createNewComponent(createTask);
                            }}
                          >
                            {loading
                              ? 'Saving'
                              : `Save your ${taskType.toLowerCase()}`}
                          </button>
                        </div>
                      )}
                    </Mutation>
                  </div>
                )}
              </div>
            </BuilderNav>

            <StyledBuilder>
              <EditPane
                handleTaskChange={this.handleComponentChange}
                handleParameterChange={this.handleParamChange}
                handleSettingsChange={this.handleSettingsChange}
                handleCollaboratorsChange={this.handleCollaboratorsChange}
                handleSetState={this.handleSetState}
                task={this.state.task}
                handleSetMultipleValuesInState={
                  this.handleSetMultipleValuesInState
                }
                user={this.props.user}
              />
              <StyledPreviewPane>
                <PreviewPane task={this.state.task} user={this.props.user} />
              </StyledPreviewPane>
            </StyledBuilder>
          </StyledBuilderPage>
        )}

        {this.state.showPreview && (
          <PreviewInBuilder
            user={this.props.user.id}
            parameters={this.state.task.parameters}
            template={this.props.task.template}
            handleFinish={() => this.setState({ showPreview: false })}
            showPreview={this.state.showPreview}
          />
        )}
      </>
    );
  }
}

export default ComponentBuilder;
