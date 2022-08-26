import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { StyledNavigation } from './styles';

import { USER_DASHBOARD_QUERY } from '../../../Queries/User';
import {
  COMPONENT_QUERY,
  COMPONENT_TO_CLONE_QUERY,
} from '../../../Queries/Component';

import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../../Mutations/Task';

class Navigation extends Component {
  render() {
    const { task, isAuthor, testId } = this.props;

    const taskType =
      task?.taskType === 'TASK'
        ? 'Task'
        : task?.taskType === 'BLOCK'
        ? 'Block'
        : 'Survey';

    return (
      <StyledNavigation>
        <div className="firstLine">
          <div className="taskTitle">
            <h1>{task?.title}</h1>
          </div>

          <div className="navButtons">
            {task?.template?.script && (
              <button
                className="secondaryBtn"
                onClick={() => this.props.onShowPreview(task)}
              >
                Preview
              </button>
            )}

            {isAuthor ? (
              <div>
                <Mutation
                  mutation={UPDATE_COMPONENT}
                  refetchQueries={[
                    {
                      query: COMPONENT_QUERY,
                      variables: {
                        id: task.id,
                      },
                    },
                    {
                      query: COMPONENT_TO_CLONE_QUERY,
                      variables: {
                        id: task.id,
                      },
                    },
                  ]}
                >
                  {(updateTask, { loading, error }) => (
                    <div>
                      <button
                        className="primaryBtn"
                        onClick={() => {
                          this.props.updateMyComponent(
                            updateTask,
                            'updateTask'
                          );
                        }}
                      >
                        {loading
                          ? 'Saving'
                          : `Save ${task?.taskType?.toLowerCase()}`}
                      </button>
                    </div>
                  )}
                </Mutation>
              </div>
            ) : (
              <div>
                <Mutation
                  mutation={CREATE_COMPONENT}
                  refetchQueries={[{ query: USER_DASHBOARD_QUERY }]}
                >
                  {(createTask, { loading, error }) => (
                    <div>
                      <button
                        className="primaryBtn"
                        onClick={() => {
                          this.props.createNewComponent(
                            createTask,
                            'createTask'
                          );
                        }}
                      >
                        {loading
                          ? 'Saving'
                          : `Customize ${task?.taskType?.toLowerCase()}`}
                      </button>
                    </div>
                  )}
                </Mutation>
              </div>
            )}

            <button
              className="primaryBtn"
              onClick={() => this.props.closeModal()}
            >
              Done
            </button>
          </div>
        </div>

        <div className="secondLine">
          <p>
            {taskType} ID: {testId}
          </p>
        </div>
      </StyledNavigation>
    );
  }
}

export default Navigation;
