import React, { Component } from 'react';

import styled from 'styled-components';
import ContainerPreview from '../../../Task/ContainerPreview/index';

const StyledPreviewLink = styled.div`
  padding: 2rem;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-align: left;
`;

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

    if (task.isExternal && task.link) {
      return (
        <StyledPreviewLink>
          Preview the {task?.taskType.toLowerCase()} at{' '}
          <a target="_blank" href={task.link}>
            {task.link}
          </a>
        </StyledPreviewLink>
      );
    }

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
