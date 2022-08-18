import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { BuilderNav } from './styles';

import { USER_DASHBOARD_QUERY } from '../../../Queries/User';
import {
  COMPONENT_QUERY,
  COMPONENT_TO_CLONE_QUERY,
} from '../../../Queries/Component';

import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../../Mutations/Task';

class Navigation extends Component {
  render() {
    const { task, isAuthor } = this.props;

    return (
      <BuilderNav>
        <div className="goBackBtn" onClick={this.props.closeModal}>
          ❌
        </div>
        <div className="taskTitle">
          <p>{task?.title}</p>
        </div>
        {false && (
          <div className="taskLabel">
            <p>
              {task?.isOriginal ? 'Original' : 'Cloned'}{' '}
              {task?.isExternal ? 'external ' : ''}
              {task?.taskType?.toLowerCase()}
            </p>
          </div>
        )}

        <div className="rightButtons">
          {task?.template?.script && (
            <button onClick={() => this.props.onShowPreview(task)}>
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
                      className="secondaryBtn"
                      onClick={() => {
                        this.props.updateMyComponent(updateTask, 'updateTask');
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
                      className="secondaryBtn"
                      onClick={() => {
                        this.props.createNewComponent(createTask, 'createTask');
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
        </div>
      </BuilderNav>
    );
  }
}

export default Navigation;
