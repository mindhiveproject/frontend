import React, { Component } from 'react';

// preview the task (for using)
import TaskWrapper from '../../Task/Wrapper';

// modify the task (for editing)
import ComponentModal from './modal.js';

// ToDo: decide what to show based on whether the user is the author or
// collaborator on the task

class ComponentWrapper extends Component {
  state = {
    page: 'description',
  };

  openEditor = () => {
    this.setState({ page: 'editor' });
  };

  render() {
    const { page } = this.state;

    if (page === 'editor') {
      return (
        <div className="modal">
          <ComponentModal
            {...this.props}
            onShowPreview={this.props.toggleComponentPreview}
          />
        </div>
      );
    }

    return (
      <div className="modal">
        <TaskWrapper
          onModalClose={this.props.closeModal}
          componentID={this.props.componentID}
          onShowPreview={this.props.toggleComponentPreview}
          openEditor={this.openEditor}
        />
      </div>
    );
  }
}

export default ComponentWrapper;
