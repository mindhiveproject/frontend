import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import { MY_ASSIGNMENT_HOMEWORKS } from '../../../Queries/Homework';
import { UPDATE_HOMEWORK } from '../../../Mutations/Homework';

class SubmitHomework extends Component {
  render() {
    return (
      <Mutation
        mutation={UPDATE_HOMEWORK}
        variables={{ id: this.props.homeworkId, public: true }}
        refetchQueries={[
          {
            query: MY_ASSIGNMENT_HOMEWORKS,
            variables: { id: this.props.assignmentId },
          },
        ]}
      >
        {(submitHomework, { error }) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (
                confirm(
                  'After you submit your homework, you cannot edit or delete it. Are you sure you want to submit?'
                )
              ) {
                submitHomework().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </div>
        )}
      </Mutation>
    );
  }
}

export default SubmitHomework;
