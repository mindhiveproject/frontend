import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { MY_TASKS_QUERY } from './my';

const DELETE_TASK_MUTATION = gql`
  mutation DELETE_TASK_MUTATION($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

class DeleteTask extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client so it matches the server
    // 1. read the cache
    const data = cache.readQuery({ query: MY_TASKS_QUERY });
    console.log('data', data);
    console.log('payload', payload);
    // 2. Filter the deleted items out of the page
    data.myTasks = data.myTasks.filter(
      task => task.id !== payload.data.deleteTask.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: MY_TASKS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_TASK_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteTask, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this task?')) {
                deleteTask().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteTask;
