import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import lz from 'lzutf8';
import EditPane from './editPane';
import PreviewPane from './previewPane';

import PreviewInBuilder from '../../Task/PreviewInBuilder/index';

// lab.js script template functions
import assemble from '../../AddExperiment/assembleDev/index';

import {
  StyledBuilder,
  BuilderNav,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

import { UPDATE_TEMPLATE } from '../../Mutations/Template';

class TemplateBuilder extends Component {
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
      const fileToSave = lz.encodeBase64(
        lz.compress(fileLoadedEvent.target.result)
      );
      // const fileToSave = lz.compress(fileLoadedEvent.target.result, [
      //   { outputEncoding: 'StorageBinaryString' },
      // ]);
      // extract parameters from the task
      this.setState({
        template: {
          ...this.state.template,
          script: compressedString,
          style: result.files['style.css'].content,
          parameters: [...result.files.parameters],
          file: fileToSave,
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
        file: null,
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
                {template?.script && (
                  <button onClick={this.togglePreview}>
                    Fullscreen Preview
                  </button>
                )}

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
                          {loading ? 'Saving' : `Save template`}
                        </button>
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
            </BuilderNav>

            <StyledBuilder isWide>
              <EditPane
                template={this.state.template}
                handleTemplateChange={this.handleTemplateChange}
                handleSettingsChange={this.handleSettingsChange}
                handleSetMultipleValuesInState={
                  this.handleSetMultipleValuesInState
                }
                handleScriptUpload={this.handleScriptUpload}
                deleteTemplateLocally={this.deleteTemplateLocally}
                handleTemplateParamChange={this.handleTemplateParamChange}
                deleteTemplateParameter={this.deleteTemplateParameter}
              />

              <StyledPreviewPane>
                <PreviewPane
                  template={this.state.template}
                  user={this.props.user}
                />
              </StyledPreviewPane>
            </StyledBuilder>
          </StyledBuilderPage>
        )}

        {this.state.showPreview && (
          <PreviewInBuilder
            user={this.props.user.id}
            parameters={this.state.template.parameters}
            template={this.props.template || this.state.template}
            handleFinish={() => this.setState({ showPreview: false })}
            showPreview={this.state.showPreview}
          />
        )}
      </>
    );
  }
}

export default TemplateBuilder;
