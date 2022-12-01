import React, { Component } from 'react';

// preview the task (for using)
import TaskWrapper from '../../Task/Wrapper';

// full screen preview
import FullScreenPreview from '../../../Preview/fullscreen';

// modify the task (for editing)
// import EditorWrapper from './editorWrapper.js';
import ComponentEditor from './editor';

// ToDo: decide what to show based on whether the user is the author or
// collaborator on the task

class ComponentViewer extends Component {
  state = {
    component: { ...this.props.component } || {},
    showPreview: this.props.preview || false,
    page: 'description',
  };

  openEditor = () => {
    this.setState({ page: 'editor' });
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
    const { component, page, showPreview } = this.state;

    if (showPreview) {
      return (
        <FullScreenPreview
          previewOf="component"
          user={this.props?.user?.id || ''}
          parameters={component.parameters}
          template={component.template}
          handleFinish={() => this.closePreview()}
        />
      );
    }

    if (page === 'editor') {
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
