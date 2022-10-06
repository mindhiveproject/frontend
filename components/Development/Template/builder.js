import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import lz from 'lzutf8';
import EditPane from './editPane';
// import PreviewPane from './previewPane';

import PreviewInBuilder from '../../Task/PreviewInBuilder/index';

// import { MY_SURVEYS_QUERY } from '../Study/StudyBuilder/Selector/mySurveys';
// import { MY_TASKS_QUERY } from '../Study/StudyBuilder/Selector/myTasks';
// import { USER_DASHBOARD_QUERY } from '../../Queries/User';
// import {
//   COMPONENT_QUERY,
//   COMPONENT_TO_CLONE_QUERY,
// } from '../../Queries/Component';
// import { MY_DEVELOPED_COMPONENTS_QUERY } from '../../Bank/Components/developed';

// lab.js script template functions
import assemble from '../../AddExperiment/assembleDev/index';

import {
  StyledBuilder,
  BuilderNav,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

import { CREATE_TEMPLATE, UPDATE_TEMPLATE } from '../../Mutations/Template';

class ComponentBuilder extends Component {
  state = {
    template: { ...this.props.template },
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  handleTemplateChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      template: {
        ...this.state.template,
        [name]: value,
      },
    });
  };

  handleParamChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      template: {
        ...this.state.template,
        parameters: this.state.template.parameters.map(el =>
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
      template: {
        ...this.state.template,
        parameters: this.state.template.parameters.map(el =>
          el.name === name ? { ...el, [className]: val } : el
        ),
      },
    });
  };

  deleteTemplateParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      template: {
        ...this.state.template,
        parameters: this.state.template.parameters.filter(
          el => el.name !== name
        ),
      },
    });
  };

  handleSettingsChange = e => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    const settings = { ...this.state.template.settings };
    settings[name] = value;
    this.setState({
      template: {
        ...this.state.template,
        settings,
      },
    });
  };

  handleSetState = (name, value) => {
    this.setState({
      template: {
        ...this.state.template,
        [name]: value,
      },
    });
  };

  handleSetMultipleValuesInState = values => {
    this.setState({
      template: {
        ...this.state.template,
        ...values,
      },
    });
  };

  createNewTemplate = async createTemplateMutation => {
    if (!this.state.template?.script) {
      alert('Please upload a lab.js script');
      return;
    }
    await createTemplateMutation({
      variables: {
        ...this.state.template,
      },
    });
  };

  updateMyTemplate = async updateTemplateMutation => {
    await updateTemplateMutation({
      variables: {
        ...this.state.template,
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
      // extract parameters from the task
      this.setState({
        template: {
          ...this.state.template,
          script: compressedString,
          style: result.files['style.css'].content,
          parameters: [
            // {
            //   name: 'instruction',
            //   type: 'textarea',
            //   value:
            //     'When asked how you feel, move the slider to the right when you feel happy and to the left when you feel unhappy.',
            //   help:
            //     'These are the instructions for how to answer the question that participants will be asked in-between the trials. The text should correspond to the question content. Make sure the instructions are written in a way that is easy to understand and that leaves no ambiguity.',
            //   example:
            //     'The original study asked about participants’ happiness. The corresponding instructions talk explain how participants should answer the question when they feel happy versus unhappy.',
            // },
            ...result.files.parameters,
          ],
        },
      });
    };
    fileReader.readAsText(e.target.files[0]);
  };

  // remove the template from the state
  deleteTemplateLocally = () => {
    this.setState({
      template: {
        ...this.state.template,
        script: null,
        style: null,
      },
    });
  };

  render() {
    const { user } = this.props;
    const { template } = this.state;
    const isAuthor = user.id === template?.author?.id;

    return (
      <>
        {!this.state.showPreview && (
          <StyledBuilderPage>
            <BuilderNav>
              <div className="goBackBtn" onClick={this.props.onLeave}>
                ← Leave Template Editor
              </div>
              <div className="taskLabel">
                <p>Original Template</p>
              </div>
              <div className="taskTitle">
                <p>{this.state.template?.title}</p>
              </div>

              <div className="rightButtons">
                {this.state.task?.template?.script && (
                  <button onClick={this.togglePreview}>
                    Fullscreen Preview
                  </button>
                )}

                <>
                  {isAuthor ? (
                    <div>
                      <Mutation mutation={UPDATE_TEMPLATE}>
                        {(updateTask, { loading, error }) => (
                          <div>
                            <button
                              className="secondaryBtn"
                              onClick={() => {
                                this.updateMyTemplate(
                                  updateTask,
                                  'updateTaskWithTemplate'
                                );
                              }}
                            >
                              {loading ? 'Saving' : `Save original template`}
                            </button>
                          </div>
                        )}
                      </Mutation>
                    </div>
                  ) : (
                    <div>
                      <Mutation mutation={CREATE_TEMPLATE}>
                        {(createTask, { loading, error }) => (
                          <div>
                            <button
                              className="secondaryBtn"
                              onClick={() => {
                                this.createNewTemplate(
                                  createTask,
                                  'createTaskWithTemplate'
                                );
                              }}
                            >
                              {loading
                                ? 'Saving'
                                : `Save your original template`}
                            </button>
                          </div>
                        )}
                      </Mutation>
                    </div>
                  )}
                </>
              </div>
            </BuilderNav>

            <StyledBuilder isWide>
              <EditPane
                template={this.state.template}
                handleTaskChange={this.handleTemplateChange}
                handleParameterChange={this.handleParamChange}
                handleTemplateParamChange={this.handleTemplateParamChange}
                deleteTemplateParameter={this.deleteTemplateParameter}
                handleSettingsChange={this.handleSettingsChange}
                handleCollaboratorsChange={this.handleCollaboratorsChange}
                handleSetState={this.handleSetState}
                handleSetMultipleValuesInState={
                  this.handleSetMultipleValuesInState
                }
                user={this.props.user}
                templateEditor={this.props.templateEditor && !needToClone}
                handleScriptUpload={this.handleScriptUpload}
                deleteTemplateLocally={this.deleteTemplateLocally}
              />

              <StyledPreviewPane>
                {false && (
                  <PreviewPane task={this.state.task} user={this.props.user} />
                )}
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
