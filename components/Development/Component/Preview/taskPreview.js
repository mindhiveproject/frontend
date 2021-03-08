import React, { Component } from 'react';

import ContainerPreview from '../../../Task/ContainerPreview/index';

class TaskPreview extends Component {
  state = {
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  render() {
    const { task } = this.props;
    return (
      <>
        {task?.template?.script && (
          <div>
            <button onClick={this.togglePreview}>
              {this.state.showPreview ? 'Stop preview' : 'Start preview'}
            </button>
          </div>
        )}

        <ContainerPreview
          user={this.props.user.id}
          parameters={this.props.task.parameters}
          template={this.props.task.template}
          handleFinish={() => this.setState({ showPreview: false })}
          showPreview={this.state.showPreview}
        />
      </>
    );
  }
}

export default TaskPreview;
