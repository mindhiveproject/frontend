import React, { Component } from 'react';

// preview the task (for using)
import TaskWrapper from '../../Task/Wrapper';

// full screen preview
import FullScreenPreview from '../../../Preview/fullscreen';

// modify the task (for editing)
import ComponentEditor from './editor';

// ToDo: decide what to show based on whether the user is the author or
// collaborator on the task

class ComponentViewer extends Component {
  state = {
    component: { ...this.props.component } || {},
    showPreview: this.props.isPreviewOpen || false,
    showInfo: this.props.isInfoOpen || false,
    showEditor: this.props.isEditorOpen || false,
  };

  openEditor = () => {
    this.setState({ showEditor: true });
  };

  openPreview = () => {
    this.setState({
      showPreview: true,
    });
  };

  closePreview = () => {
    this.setState({
      showPreview: false,
    });
  };

  render() {
    const { isAuthor } = this.props;
    const { component, showInfo, showPreview, showEditor } = this.state;

    if (showPreview) {
      return (
        <FullScreenPreview
          previewOf="component"
          user={this.props?.user?.id || ''}
          parameters={component.parameters}
          template={component.template}
          handleFinish={() => {
            this.closePreview();
            if (!showInfo) this.props.closeModal();
          }}
        />
      );
    }

    if (showEditor) {
      return (
        <div className="background">
          <div className="modal">
            <ComponentEditor
              {...this.props}
              task={component}
              isAuthor={isAuthor}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="background">
        <div className="modal">
          <TaskWrapper
            component={component}
            onModalClose={this.props.closeModal}
            onShowPreview={this.openPreview}
            openEditor={this.openEditor}
          />
        </div>
      </div>
    );
  }
}

export default ComponentViewer;
