import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import { TASK_QUERY } from '../../Task/Run/index';
import TestManager from '../TestManager';

const StyledLinkWindow = styled.div`
  height: 90vh;
  padding: 2rem;
  display: grid;
  justify-items: center;
  align-content: center;
  line-height: 3rem;
  font-family: Lato;
  font-size: 1.5rem;
  font-weight: 400;
  color: #666666;
`;

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

          if (testPayloadData.isExternal && testPayloadData.link) {
            return (
              <StyledLinkWindow>
                Please click the link below to participate in the{' '}
                {testPayloadData.taskType.toLowerCase()}{' '}
                <strong>{testPayloadData.title}</strong>{' '}
                <a href={testPayloadData.link} target="_blank">
                  {testPayloadData.link}
                </a>
              </StyledLinkWindow>
            );
          }

          return (
            <TestManager
              user={this.props.user}
              study={this.props.study}
              test={testPayloadData}
              version={this.props.v}
            />
          );
        }}
      </Query>
    );
  }
}

export default TestWrapper;
