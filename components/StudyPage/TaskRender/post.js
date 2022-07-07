import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import {
  OnboardingForm,
  ResponseButtons,
  OnboardingHeader,
} from '../../Study/styles';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';
import StudyConsentText from '../../Study/Registration/Steps/4-studyConsentText';
import StudyConsentForm from '../../Study/Registration/Steps/5-studyConsent';

import DataUsageForStudent from '../../Task/Run/DataUsage/student';
import DataUsageForParticipant from '../../Task/Run/DataUsage/participant';

const UPDATE_RESULTS_INFO_MUTATION = gql`
  mutation UPDATE_RESULTS_INFO_MUTATION($id: ID!, $info: Json) {
    updateResultsInfo(id: $id, info: $info) {
      message
    }
  }
`;

class Post extends Component {
  state = { token: this.props.token };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e, updateResultsMutation) => {
    e.preventDefault();
    if (!this.state.data) {
      return alert('Please answer the question first');
    }
    const res = await updateResultsMutation({
      variables: {
        id: this.state.token,
        info: {
          data: this.state.data,
          task: {
            id: this.props.task.id,
            data: this.state.data,
            taskType: this.props.task.taskType,
          },
        },
      },
    });
    // return back to the study page
    this.props.onClosePrompt();
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_RESULTS_INFO_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(updateResult, { error, loading }) => {
          const { study, user, task } = this.props;
          const isStudent = user?.permissions.includes('STUDENT');

          return (
            <OnboardingForm>
              <h1>Thank you for participating in this task!</h1>
              {isStudent ? (
                <DataUsageForStudent
                  data={this.state.data}
                  updateState={this.updateState}
                />
              ) : (
                <DataUsageForParticipant
                  data={this.state.data}
                  updateState={this.updateState}
                />
              )}
              {loading ? (
                <p>Updating ... </p>
              ) : (
                <button
                  disabled={loading}
                  onClick={e => this.onSubmit(e, updateResult)}
                >
                  Next
                </button>
              )}
            </OnboardingForm>
          );
        }}
      </Mutation>
    );
  }
}

export default Post;
