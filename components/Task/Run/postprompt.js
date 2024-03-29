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
import Crossover from './crossover';
import StudyConsentText from '../../Study/Registration/Steps/4-studyConsentText';
import StudyConsentForm from '../../Study/Registration/Steps/5-studyConsent';

import DataUsageForStudent from './DataUsage/student';
import DataUsageForParticipant from './DataUsage/participant';

const UPDATE_RESULTS_INFO_MUTATION = gql`
  mutation UPDATE_RESULTS_INFO_MUTATION($id: ID!, $info: Json) {
    updateResultsInfo(id: $id, info: $info) {
      message
    }
  }
`;

class PostPrompt extends Component {
  checkConsent = () => {
    const { consent } = this.props.task;
    let isConsentGiven = false;
    if (consent && consent.id) {
      const userConsents = this.props.user.consentGivenFor.map(c => c.id);
      isConsentGiven = userConsents.includes(consent.id);
    }
    return isConsentGiven;
  };

  checkDataAgreement = () => {
    // check that the data agreement is present
    const userDataPolicy = this.props.user?.generalInfo?.data || undefined;
    return userDataPolicy;
  };

  checkNextTaskId = () => {
    const { study, user } = this.props;
    let components = [];
    if (
      study.components &&
      study.components.blocks &&
      study.components.blocks.length &&
      study.components.blocks[0].tests
    ) {
      // select the blocks for the specific user
      const userStudyInfo = user.studiesInfo[study.id];
      const userBlock = userStudyInfo.blockId;
      const studyBlock = study.components.blocks.filter(
        block => block.blockId === userBlock
      );
      if (studyBlock && studyBlock.length && studyBlock[0].tests) {
        components = studyBlock[0].tests;
      }
    } else {
      components = study.components;
    }
    const fullResultsInThisStudy =
      user?.results
        .filter(
          result =>
            result.study &&
            result.study.id === this.props.study.id &&
            result.payload === 'full'
        )
        .map(result => result.task.id) || [];
    const notCompletedTasks = components.filter(
      task => !fullResultsInThisStudy.includes(task.id)
    );
    let nextTaskId;
    if (notCompletedTasks && notCompletedTasks.length > 1) {
      nextTaskId = notCompletedTasks[1].id;
    }
    return nextTaskId;
  };

  checkWhetherToShowDataUsageQuestion = () => {
    const isStudent = this.props?.user?.permissions.includes('STUDENT');
    if (isStudent) {
      return true;
    }
    return false;
  };

  state = {
    data: this.checkDataAgreement(),
    agreeReceiveTaskUpdates: true,
    consentResponseGiven: this.checkConsent(),
    saveCoveredConsent: true,
    nextTaskId: this.checkNextTaskId(),
    askDataUsageQuestion: this.checkWhetherToShowDataUsageQuestion(),
    page: 1,
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  onNext = () => {
    if (!this.state.data) {
      alert('Please answer the question first');
    } else {
      this.setState({
        askDataUsageQuestion: false,
      });
    }
  };

  onSubmit = async (e, updateResultsMutation, redirect) => {
    e.preventDefault();
    const res = await updateResultsMutation({
      variables: {
        id: this.props.token,
        info: {
          email: this.state.email, // to update the email of the user
          data: this.state.data,
          task: {
            id: this.props.task.id,
            data: this.state.data,
            agreeReceiveTaskUpdates: this.state.agreeReceiveTaskUpdates,
            consentGiven: this.state.consentGiven,
            saveCoveredConsent: this.state.saveCoveredConsent,
            taskType: this.props.task.taskType,
          },
          consent: {
            id: this.state.consentId,
            consentGiven: this.state.consentGiven,
            saveCoveredConsent: this.state.saveCoveredConsent,
          },
        },
      },
    });

    // return back to the study page or continue to the next task
    if (this.props.slug) {
      if (redirect === 'studyPage') {
        this.props.onEndTask();
      } else if (redirect === 'nextTask' && this.state.nextTaskId) {
        this.props.onStartTheTask(this.state.nextTaskId);
      }
      this.props.onClosePrompt();
    }
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_RESULTS_INFO_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(updateResult, { error }) => {
          const { study, user, task } = this.props;
          const isStudent = user?.permissions.includes('STUDENT');

          // always show data usage prompt
          if (this.state.askDataUsageQuestion) {
            return (
              <div>
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

                  {this.state.data === 'science' &&
                    task.consent &&
                    !this.state.consentResponseGiven &&
                    this.state.page === 1 && (
                      <div>
                        <p>
                          You agreed to use your data for scientific purposes,
                          please consider providing consent.
                        </p>
                        <StudyConsentText
                          onClose={() => {
                            // console.log('closing');
                          }}
                          title={study.title}
                          consent={task.consent}
                          onNext={e => {
                            this.setState({
                              consentGiven: true,
                              consentId: task.consent?.id,
                            });
                            this.onNext();
                          }}
                          onSkip={e => {
                            this.setState({
                              consentGiven: false,
                            });
                            this.onNext();
                          }}
                          toggleState={this.toggleState}
                          saveCoveredConsent={this.state.saveCoveredConsent}
                          showCloseButton={false}
                        />
                      </div>
                    )}

                  {this.state.data === 'science' &&
                    task.consent &&
                    !this.state.consentResponseGiven &&
                    this.state.page === 2 && (
                      <div>
                        <StudyConsentForm
                          onClose={() => {
                            // console.log('closing');
                          }}
                          title={study.title}
                          consent={task.consent}
                          onNext={() =>
                            this.setState({
                              page: this.state.page + 1,
                            })
                          }
                          toggleState={this.toggleState}
                          saveCoveredConsent={this.state.saveCoveredConsent}
                          showCloseButton={false}
                        />
                      </div>
                    )}

                  {!(
                    this.state.data === 'science' &&
                    task.consent &&
                    !this.state.consentResponseGiven
                  ) && <button onClick={() => this.onNext()}>Next</button>}
                </OnboardingForm>
              </div>
            );
          }
          return (
            <Crossover
              user={this.props.user}
              study={this.props.study}
              task={this.props.task}
              onUpdateState={this.updateState}
              onToggleState={this.toggleState}
              agreeReceiveTaskUpdates={this.state.agreeReceiveTaskUpdates}
              updateResultMutation={updateResult}
              onSubmit={this.onSubmit}
              nextTaskId={this.state.nextTaskId}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default PostPrompt;
