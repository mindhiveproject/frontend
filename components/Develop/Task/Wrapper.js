import React, { Component } from 'react';

import TaskContent from './Content';
import { CloseButton } from '../../Preview/styles';

import { StyledHeader, StyledButtons } from '../styles';

class TaskWrapper extends Component {
  render() {
    const { component, onModalClose, openEditor, onShowPreview } = this.props;

    const taskType =
      component?.taskType === 'TASK'
        ? 'task'
        : component?.taskType === 'BLOCK'
        ? 'block'
        : 'survey';

    return (
      <>
        <StyledHeader>
          <div>
            <h1>{component?.title}</h1>
            <p>{component?.description}</p>
          </div>
          <div className="rightPanel">
            <StyledButtons>
              <CloseButton onClick={() => onModalClose()}>&times;</CloseButton>
              <div>
                <button
                  className="previewBtn"
                  onClick={() => {
                    openEditor();
                  }}
                >
                  Customize
                </button>
              </div>
              <div>
                <button
                  className="previewBtn"
                  onClick={e => {
                    onShowPreview();
                  }}
                >
                  Preview {taskType}
                </button>
              </div>
            </StyledButtons>
          </div>
        </StyledHeader>
        <TaskContent {...this.props} component={component} />
      </>
    );
  }
}

export default TaskWrapper;
