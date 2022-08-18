import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { COMPONENT_TO_CLONE_QUERY } from '../../Queries/Component';

import TaskContent from './Content';

import { StyledHeader, StyledButtons } from '../styles';

import { CloseButton } from '../../Preview/styles';

class TaskWrapper extends Component {
  render() {
    return (
      <Query
        query={COMPONENT_TO_CLONE_QUERY}
        variables={{ id: this.props.componentID }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.componentID}</p>;

          const component = data?.task;

          const taskType =
            component?.taskType === 'TASK'
              ? 'task'
              : component?.taskType === 'BLOCK'
              ? 'block'
              : 'survey';

          return (
            <>
              <CloseButton onClick={() => this.props.onModalClose()}>
                &times;
              </CloseButton>

              <StyledHeader>
                <div>
                  <h1>{component?.title}</h1>
                  <p>{component?.description}</p>
                </div>
                <div className="rightPanel">
                  <StyledButtons>
                    <div>
                      <button
                        className="addBtn"
                        onClick={() => {
                          this.props.openEditor();
                        }}
                      >
                        Customize
                      </button>
                    </div>
                    <div>
                      <button
                        className="previewBtn"
                        onClick={e => {
                          // this.props.onModalClose();
                          this.props.onShowPreview(component);
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
        }}
      </Query>
    );
  }
}

export default TaskWrapper;
