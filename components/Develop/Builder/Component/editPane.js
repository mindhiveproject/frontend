import React, { Component } from 'react';

import { StyledEditPane } from './styles';

import EditBasic from './Edit/editBasic';
import EditParameters from './Edit/editParameters';
import EditSharing from './Edit/editSharing';
import EditBlock from './Edit/editBlock';

class EditPane extends Component {
  render() {
    return (
      <StyledEditPane>
        <EditBasic
          task={this.props.task}
          handleTaskChange={this.props.handleTaskChange}
          handleSettingsChange={this.props.handleSettingsChange}
          handleSetMultipleValuesInState={
            this.props.handleSetMultipleValuesInState
          }
          user={this.props.user}
          templateEditor={this.props.templateEditor}
          handleScriptUpload={this.props.handleScriptUpload}
          deleteTemplateLocally={this.props.deleteTemplateLocally}
          adminMode={this.props.adminMode}
          uploadImage={this.props.uploadImage}
        />

        {(true || this.props.task?.taskType === 'BLOCK') && (
          <EditBlock
            task={this.props.task}
            handleParameterChange={this.props.handleParameterChange}
            templateEditor={this.props.templateEditor}
            handleTemplateParamChange={this.props.handleTemplateParamChange}
            deleteTemplateParameter={this.props.deleteTemplateParameter}
          />
        )}

        {this.props.task?.taskType !== 'BLOCK' && (
          <EditParameters
            task={this.props.task}
            handleParameterChange={this.props.handleParameterChange}
            templateEditor={this.props.templateEditor}
            handleTemplateParamChange={this.props.handleTemplateParamChange}
            deleteTemplateParameter={this.props.deleteTemplateParameter}
          />
        )}

        <EditSharing
          task={this.props.task}
          handleCollaboratorsChange={this.props.handleCollaboratorsChange}
          handleSetState={this.props.handleSetState}
        />
      </StyledEditPane>
    );
  }
}

export default EditPane;
