import React, { Component } from 'react';

import { StyledTaskPreviewPane } from './styles';

import TaskPreview from './Preview/taskPreview';

class PreviewPane extends Component {
  render() {
    const { template } = this.props;

    return (
      <StyledTaskPreviewPane>
        <TaskPreview template={template} user={this.props.user} />
      </StyledTaskPreviewPane>
    );
  }
}

export default PreviewPane;
