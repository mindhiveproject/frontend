import React, { Component } from 'react';

import EditPane from './editPane';
import PreviewPane from './previewPane';
import SelectorPane from './componentSelector';

import { StyledBuilder, StyledPreviewPane } from '../../styles';

class StudyBuilderSection extends Component {
  render() {
    return (
      <StyledBuilder>
        {!this.props.isTaskSelectorOpen && (
          <EditPane
            handleStudyChange={this.props.handleStudyChange}
            handleParameterChange={this.props.handleParameterChange}
            handleSettingsChange={this.props.handleSettingsChange}
            handleCollaboratorsChange={this.props.handleCollaboratorsChange}
            handleSetState={this.props.handleSetState}
            study={this.props.study}
            user={this.props.user}
            needToClone={this.props.needToClone}
          />
        )}
        {this.props.isTaskSelectorOpen && (
          <SelectorPane
            onAddComponent={this.props.onAddComponent}
            toggleTaskSelector={this.props.toggleTaskSelector}
            user={this.props.user}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}

        <StyledPreviewPane>
          <PreviewPane
            study={this.props.study}
            handleStudyChange={this.props.handleStudyChange}
            handleSetMultipleValuesInState={
              this.props.handleSetMultipleValuesInState
            }
            uploadImage={this.props.uploadImage}
            handleParameterChange={this.props.handleParameterChange}
            deleteParameter={this.props.deleteParameter}
            toggleTaskSelector={this.props.toggleTaskSelector}
            openTaskEditor={this.props.openTaskEditor}
            needToClone={this.props.needToClone}
            updateComponents={this.props.updateComponents}
          />
        </StyledPreviewPane>
      </StyledBuilder>
    );
  }
}

export default StudyBuilderSection;
