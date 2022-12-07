import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import lz from 'lzutf8';
import EditPane from './editPane';
import PreviewPane from './previewPane';

import PreviewInBuilder from '../../Task/PreviewInBuilder/index';

import { MY_SURVEYS_QUERY } from '../Study/StudyBuilder/Selector/mySurveys';
import { MY_TASKS_QUERY } from '../Study/StudyBuilder/Selector/myTasks';
import { USER_DASHBOARD_QUERY } from '../../Queries/User';
import {
  COMPONENT_QUERY,
  COMPONENT_TO_CLONE_QUERY,
  MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
} from '../../Queries/Component';

// lab.js script template functions
import assemble from '../../AddExperiment/assembleDev/index';

import { MY_DEVELOPED_COMPONENTS_QUERY } from '../../Bank/Components/developed';

import {
  StyledBuilder,
  BuilderNav,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

import {
  CREATE_COMPONENT_WITH_TEMPLATE,
  UPDATE_COMPONENT_WITH_TEMPLATE,
  CREATE_COMPONENT,
  UPDATE_COMPONENT,
} from '../../Mutations/Task';

class ComponentBuilder extends Component {
  state = {
    task: { ...this.props.task },
    needToClone: this.props.needToClone,
    showPreview: false,
    adminMode: this.props.adminMode,
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

  handleTemplateParamChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (classType === 'array') {
      val = JSON.stringify(val.split('\n'));
    }
    this.setState({
      task: {
        ...this.state.task,
        parameters: this.state.task.parameters.map(el =>
          el.name === name ? { ...el, [className]: val } : el
        ),
      },
    });
  };

  deleteTemplateParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      task: {
        ...this.state.task,
        parameters: this.state.task.parameters.filter(el => el.name !== name),
      },
    });
  };

  handleSettingsChange = e => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
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

  createNewComponent = async (createComponentMutation, name) => {
    if (
      name === 'createTaskWithTemplate' &&
      !this.state.task?.template?.script
    ) {
      alert('Please upload a lab.js script');
      return;
    }
    const res = await createComponentMutation({
      variables: {
        ...this.state.task,
      },
    });
    const myTask = res.data[name];
    this.setState({
      needToClone: false,
      task: {
        ...myTask,
        consent: myTask?.consent?.id,
        collaborators: (myTask?.collaborators &&
          myTask.collaborators.map(c => c.username).length &&
          myTask.collaborators.map(c => c.username)) || [''],
      },
    });
  };

  updateMyComponent = async (updateComponentMutation, name) => {
    const res = await updateComponentMutation({
      variables: {
        ...this.state.task,
      },
    });
    const myTask = res.data[name];
    this.setState({
      task: {
        ...this.state.task,
        template: {
          ...this.state.task.template,
          ...myTask.template,
        },
      },
    });
  };

  // handle lab.js JSON file script upload
  // put the template in the state
  handleScriptUpload = async e => {
    const fileReader = new FileReader();
    const fileName =
      e.target.files[0].name && e.target.files[0].name.split('.')[0];
    fileReader.onload = async fileLoadedEvent => {
      const file = JSON.parse(fileLoadedEvent.target.result);
      const result = await assemble(file, fileName);
      const script = result.files['script.js'].content;
      const compressedString = lz.encodeBase64(lz.compress(script));
      const fileToSave = lz.compress(fileLoadedEvent.target.result);
      // extract parameters from the task
      this.setState({
        task: {
          ...this.state.task,
          template: {
            ...this.state.task?.template,
            script: compressedString,
            style: result.files['style.css'].content,
            parameters: [...result.files.parameters],
            file: fileToSave,
          },
          parameters: [...result.files.parameters],
        },
      });
    };
    fileReader.readAsText(e.target.files[0]);
  };

  // remove the template from the state
  deleteTemplateLocally = () => {
    this.setState({
      task: {
        ...this.state.task,
        template: {
          ...this.state.task?.template,
          script: null,
          style: null,
          file: null,
        },
      },
    });
  };

  uploadImage = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'studies');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive-science/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    this.setState({
      task: {
        ...this.state.task,
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
      },
    });
  };

  render() {
    const { user } = this.props;
    const { task, needToClone, adminMode } = this.state;
    const isAuthor =
      user.id === task?.author?.id ||
      task?.collaborators?.includes(user.username);
    const taskType =
      task?.taskType === 'TASK'
        ? 'Task'
        : task?.taskType === 'BLOCK'
        ? 'Block'
        : 'Survey';

    return (
      <>
        {!this.state.showPreview && (
          <StyledBuilderPage>
            <BuilderNav>
              <div className="goBackBtn" onClick={this.props.onLeave}>
                ← Leave {taskType} Editor
              </div>
              <div className="taskLabel">
                <p>
                  {this.state.task?.isOriginal ? 'Original' : 'Cloned'}{' '}
                  {this.state.task?.isExternal ? 'external ' : ''}
                  {task?.taskType.toLowerCase()}
                </p>
              </div>
              <div className="taskTitle">
                <p>{this.state.task?.title}</p>
              </div>

              <div className="rightButtons">
                {this.state.task?.template?.script && (
                  <button onClick={this.togglePreview}>
                    Fullscreen Preview
                  </button>
                )}

                {this.props.templateEditor && !needToClone ? (
                  <>
                    {isAuthor || adminMode ? (
                      <div>
                        <Mutation
                          mutation={UPDATE_COMPONENT_WITH_TEMPLATE}
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
                            {
                              query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
                              variables: { taskType: task?.taskType },
                            },
                          ]}
                        >
                          {(updateTask, { loading, error }) => (
                            <div>
                              <button
                                className="secondaryBtn"
                                onClick={() => {
                                  this.updateMyComponent(
                                    updateTask,
                                    'updateTaskWithTemplate'
                                  );
                                }}
                              >
                                {loading
                                  ? 'Saving'
                                  : `Save original ${task?.taskType.toLowerCase()}`}
                              </button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    ) : (
                      <div>
                        <Mutation
                          mutation={CREATE_COMPONENT_WITH_TEMPLATE}
                          refetchQueries={[
                            { query: MY_SURVEYS_QUERY },
                            { query: MY_TASKS_QUERY },
                            { query: USER_DASHBOARD_QUERY },
                            {
                              query: MY_DEVELOPED_COMPONENTS_QUERY,
                              variables: { taskType: task?.taskType },
                            },
                            {
                              query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
                              variables: { taskType: task?.taskType },
                            },
                          ]}
                        >
                          {(createTask, { loading, error }) => (
                            <div>
                              <button
                                className="secondaryBtn"
                                onClick={() => {
                                  this.createNewComponent(
                                    createTask,
                                    'createTaskWithTemplate'
                                  );
                                }}
                              >
                                {loading
                                  ? 'Saving'
                                  : `Save your original ${task?.taskType.toLowerCase()}`}
                              </button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {(isAuthor || adminMode) && !needToClone ? (
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
                            {
                              query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
                              variables: { taskType: task?.taskType },
                            },
                          ]}
                        >
                          {(updateTask, { loading, error }) => (
                            <div>
                              <button
                                className="secondaryBtn"
                                onClick={() => {
                                  this.updateMyComponent(
                                    updateTask,
                                    'updateTask'
                                  );
                                }}
                              >
                                {loading
                                  ? 'Saving'
                                  : `Save ${task?.taskType.toLowerCase()}`}
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
                            {
                              query: MY_DEVELOPED_COMPONENTS_QUERY,
                              variables: { taskType: task?.taskType },
                            },
                            {
                              query: MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY,
                              variables: { taskType: task?.taskType },
                            },
                          ]}
                        >
                          {(createTask, { loading, error }) => (
                            <div>
                              <button
                                className="secondaryBtn"
                                onClick={() => {
                                  this.createNewComponent(
                                    createTask,
                                    'createTask'
                                  );
                                }}
                              >
                                {loading
                                  ? 'Saving'
                                  : `Save your ${task?.taskType.toLowerCase()}`}
                              </button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    )}
                  </>
                )}
              </div>
            </BuilderNav>

            <StyledBuilder isWide>
              <EditPane
                handleTaskChange={this.handleComponentChange}
                handleParameterChange={this.handleParamChange}
                handleTemplateParamChange={this.handleTemplateParamChange}
                deleteTemplateParameter={this.deleteTemplateParameter}
                handleSettingsChange={this.handleSettingsChange}
                handleCollaboratorsChange={this.handleCollaboratorsChange}
                handleSetState={this.handleSetState}
                task={this.state.task}
                handleSetMultipleValuesInState={
                  this.handleSetMultipleValuesInState
                }
                user={this.props.user}
                templateEditor={this.props.templateEditor && !needToClone}
                handleScriptUpload={this.handleScriptUpload}
                deleteTemplateLocally={this.deleteTemplateLocally}
                adminMode={this.props.adminMode}
                uploadImage={this.uploadImage}
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
            template={this.props.task?.template || this.state.task?.template}
            handleFinish={() => this.setState({ showPreview: false })}
            showPreview={this.state.showPreview}
          />
        )}
      </>
    );
  }
}

export default ComponentBuilder;
