import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { TASK_QUERY } from '../../Task/Run/index';
import TestManager from '../TestManager';

// get the information about the current test
class TestWrapper extends Component {
  render() {
    return (
      <Query query={TASK_QUERY} variables={{ id: this.props.t }}>
        {testPayload => {
          const testPayloadError = testPayload.error;
          const testPayloadLoading = testPayload.loading;
          const testPayloadData = testPayload.data && testPayload.data.task;
          if (testPayloadError) return <Error error={testPayloadError} />;
          if (testPayloadLoading) return <p>Loading</p>;

          return (
            <TestManager
              user={this.props.user}
              study={this.props.study}
              test={testPayloadData}
            />
          );
        }}
      </Query>
    );
  }
}

export default TestWrapper;
