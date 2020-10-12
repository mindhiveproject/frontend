import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import styled from 'styled-components';
import EditPane from './editPane';
import PreviewPane from './previewPane';

import { MY_SURVEYS_QUERY } from '../Study/Selector/mySurveys';
import { MY_TASKS_QUERY } from '../Study/Selector/myTasks';
import { USER_DASHBOARD_QUERY } from '../../User/index';
import { COMPONENT_QUERY } from '../Study/Preview/componentPane';
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
  };

  handleTaskChange = e => {
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
    console.log('name, value', name, value);
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
    // console.log('name value', name, value);
    const collaborators = [...this.state.task.collaborators];
    // console.log('collaborators', collaborators);
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

  createNewTask = async createTaskMutation => {
    const res = await createTaskMutation({
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
    console.log('my new task', myTask);
  };

  updateMyTask = async updateTaskMutation => {
    const res = await updateTaskMutation({
      variables: {
        ...this.state.task,
      },
    });
    console.log('updating result', res);
  };

  render() {
    const { user } = this.props;
    const { task, needToClone } = this.state;
    const isAuthor =
      user.id === this.props.task?.author?.id ||
      this.props.task?.collaborators.includes(user.username);

    return (
      <StyledBuilderPage>
        <BuilderNav>
          <div className="goBackBtn" onClick={this.props.onLeave}>
            ← Leave Task Builder
          </div>
          <div>
            <p>{this.state.task.title}</p>
          </div>

          {isAuthor && !needToClone ? (
            <div className="saveBtn">
              <Mutation
                mutation={UPDATE_COMPONENT}
                refetchQueries={[
                  {
                    query: COMPONENT_QUERY,
                    variables: {
                      id: this.state.task.id,
                    },
                  },
                ]}
              >
                {(updateTask, { loading, error }) => (
                  <div>
                    <button
                      onClick={() => {
                        this.updateMyTask(updateTask);
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </Mutation>
            </div>
          ) : (
            <div className="saveBtn">
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
                      onClick={() => {
                        this.createNewTask(createTask);
                      }}
                    >
                      Create new task
                    </button>
                  </div>
                )}
              </Mutation>
            </div>
          )}
        </BuilderNav>

        <StyledBuilder>
          <EditPane
            handleTaskChange={this.handleTaskChange}
            handleParameterChange={this.handleParamChange}
            handleSettingsChange={this.handleSettingsChange}
            handleCollaboratorsChange={this.handleCollaboratorsChange}
            handleSetState={this.handleSetState}
            task={this.state.task}
            handleSetMultipleValuesInState={this.handleSetMultipleValuesInState}
          />
          <StyledPreviewPane>
            <PreviewPane task={this.state.task} user={this.props.user} />
          </StyledPreviewPane>
        </StyledBuilder>
      </StyledBuilderPage>
    );
  }
}

export default ComponentBuilder;
