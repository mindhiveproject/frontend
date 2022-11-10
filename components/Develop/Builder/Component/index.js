import React, { Component } from 'react';

// preview the task (for using)
import TaskWrapper from '../../Task/Wrapper';

// full screen preview
import FullScreenPreview from '../../../Preview/fullscreen';

// modify the task (for editing)
import EditorWrapper from './editorWrapper.js';

// ToDo: decide what to show based on whether the user is the author or
// collaborator on the task

class ComponentViewer extends Component {
  state = {
    page: 'description',
    showPreview: false,
  };

  openEditor = () => {
    this.setState({ page: 'editor' });
  };

  openPreview = component => {
    this.setState({
      showPreview: true,
      component,
    });
  };

  closePreview = () => {
    this.setState({
      showPreview: false,
    });
  };

  render() {
    const { page } = this.state;

    if (this.state.showPreview) {
      return (
        <FullScreenPreview
          previewOf="component"
          user={this.props?.user?.id || ''}
          parameters={this.state.component.parameters}
          template={this.state.component.template}
          handleFinish={() => this.closePreview()}
        />
      );
    }

    if (page === 'editor') {
      return (
        <div className="background">
          <div className="modal">
            <EditorWrapper {...this.props} />
          </div>
        </div>
      );
    }

    return (
      <div className="background">
        <div className="modal">
          <TaskWrapper
            onModalClose={this.props.closeModal}
            componentID={this.props.componentID}
            onShowPreview={this.openPreview}
            openEditor={this.openEditor}
          />
        </div>
      </div>
    );
  }
}

export default ComponentViewer;
