import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { REVIEW_CLASS_QUERY } from '../Review/index';

const EXPEL_CLASS_MUTATION = gql`
  mutation EXPEL_CLASS_MUTATION($classId: ID!, $studentId: ID!) {
    expelFromClass(classId: $classId, studentId: $studentId) {
      message
    }
  }
`;

class ExpelFromClass extends Component {
  render() {
    return (
      <Mutation
        mutation={EXPEL_CLASS_MUTATION}
        variables={{
          classId: this.props.classId,
          studentId: this.props.studentId,
        }}
        refetchQueries={[
          {
            query: REVIEW_CLASS_QUERY,
            variables: {
              id: this.props.classId,
            },
          },
        ]}
      >
        {(expelFromClass, { error }) => (
          <button
            type="button"
            onClick={async () => {
              const res = await expelFromClass();
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default ExpelFromClass;
