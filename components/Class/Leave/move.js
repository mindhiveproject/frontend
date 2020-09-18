import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { REVIEW_CLASS_QUERY } from '../Review/index';
import { MY_CLASSES_QUERY } from '../Board/my';

const MOVE_TO_CLASS_MUTATION = gql`
  mutation MOVE_TO_CLASS_MUTATION($classId: ID!, $studentId: ID!) {
    moveToClass(classId: $classId, studentId: $studentId) {
      message
    }
  }
`;

class MoveToClass extends Component {
  state = {
    newClassId: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={MOVE_TO_CLASS_MUTATION}
        variables={{
          classId: this.state.newClassId,
          studentId: this.props.studentId,
        }}
        refetchQueries={[
          {
            query: REVIEW_CLASS_QUERY,
            variables: {
              id: this.state.newClassId,
            },
          },
        ]}
      >
        {(moveToClass, { error }) => (
          <div>
            Select new class
            <Query query={MY_CLASSES_QUERY}>
              {({ data, error, loading }) => {
                if (loading) return <p>Loading ...</p>;
                if (error) return <p>Error: {error.message}</p>;
                return (
                  <div>
                    <select
                      type="text"
                      id="newClassId"
                      name="newClassId"
                      value={this.state.newClassId}
                      onChange={this.handleChange}
                    >
                      <option value="no">Choose the new class</option>
                      {data.myClasses.map(myClass => (
                        <option key={myClass.id} value={myClass.id}>
                          {myClass.title}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }}
            </Query>
            <button
              type="button"
              onClick={async () => {
                const res = await moveToClass();
              }}
            >
              Move to new class
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default MoveToClass;
