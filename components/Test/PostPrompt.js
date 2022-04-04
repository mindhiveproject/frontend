import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { OnboardingForm } from '../Study/styles';
import { CURRENT_USER_RESULTS_QUERY } from '../User/index';

import Crossover from './crossover';
import GuestCrossover from './guestCrossover';

import StudyConsentText from '../Study/Registration/Steps/4-studyConsentText';
import StudyConsentForm from '../Study/Registration/Steps/5-studyConsent';

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
      const participantConsents = this.props.participant?.consentGivenFor.map(
        c => c.id
      );
      isConsentGiven = participantConsents.includes(consent.id);
    }
    return isConsentGiven;
  };

  checkDataAgreement = () => {
    // check that the data agreement is present
    // Question - do we save it somewhere before?
    const participantDataPolicy =
      this.props.participant?.generalInfo?.data || undefined;
    return participantDataPolicy;
  };

  checkNextTaskId = () => {
    const { study, participant, version } = this.props;
    let components = [];
    if (
      study.components &&
      study.components.blocks &&
      study.components.blocks.length &&
      study.components.blocks[0].tests
    ) {
      // select the blocks for the specific participant
      const participantStudyInfo = participant.studiesInfo[study.id];
      const participantBlock = participantStudyInfo.blockId;
      const studyBlock = study.components.blocks.filter(
        block => block.blockId === participantBlock
      );
      if (studyBlock && studyBlock.length && studyBlock[0].tests) {
        components = studyBlock[0].tests;
      }
    } else {
      components = study.components;
    }
    const fullResultsInThisStudy =
      participant?.results
        .filter(
          result =>
            result.study &&
            result.study.id === this.props.study.id &&
            result.payload === 'full'
        )
        .map(result => result?.testVersion) || [];
    // .map(result => result.task.id) || [];
    const notCompletedTasks = components.filter(
      task =>
        !fullResultsInThisStudy.includes(task?.testId) &&
        task?.testId !== version
    );
    // const notCompletedTasks = components.filter(
    //   task => !fullResultsInThisStudy.includes(task.id)
    // );
    let nextTaskId;
    if (notCompletedTasks && notCompletedTasks.length > 0) {
      nextTaskId = notCompletedTasks[0].testId;
      // nextTaskId = notCompletedTasks[1].id;
    }
    return nextTaskId;
  };

  checkWhetherToShowDataUsageQuestion = () => {
    const isStudent = this.props?.participant?.permissions?.includes('STUDENT');
    if (isStudent) {
      return true;
    }
    return false;
  };

  state = {
    agreeReceiveTaskUpdates: true,
    saveCoveredConsent: true,
    page: 1,
    data: this.checkDataAgreement(),
    consentResponseGiven: this.checkConsent(),
    nextTaskId: this.checkNextTaskId(),
    askDataUsageQuestion: this.checkWhetherToShowDataUsageQuestion(),
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

  onGuestSubmit = async (e, redirect) => {
    e.preventDefault();
    // return back to the study page or continue to the next task
    if (redirect === 'nextTask' && this.state.nextTaskId) {
      window.location = `/do/task?s=${this.props.study.id}&v=${this.state.nextTaskId}&code=${this.props.guest?.publicId}`;
      // Router.push({
      //   pathname: `/do/task`,
      //   query: {
      //     s: this.props.study.id,
      //     v: this.state.nextTaskId,
      //     code: this.props.guest?.publicId,
      //   },
      // });
      // http://localhost:7777/do/task?s=cl14xwcf7glc20914juj7orlt&v=l14xwvbk&code=sktwilj5l1l5e7wr
    } else {
      window.location = `/studies/${this.props.study.slug}?code=${this.props.guest?.publicId}`;
      // Router.push({
      //   pathname: `/studies/${this.props.study.slug}`,
      //   query: {
      //     code: this.props.guest?.publicId,
      //   },
      // });
    }
  };

  onSubmit = async (e, updateResultsMutation, redirect) => {
    e.preventDefault();
    updateResultsMutation({
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
    if (redirect === 'nextTask' && this.state.nextTaskId) {
      Router.push({
        pathname: `/do/task`,
        query: {
          s: this.props.study.id,
          v: this.state.nextTaskId,
        },
      });
    } else {
      Router.push({
        pathname: `/studies/${this.props.study.slug}`,
      });
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
          const { study, participant, task } = this.props;

          const isStudent = participant?.permissions?.includes('STUDENT');

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

          if (this.props.guest) {
            return (
              <GuestCrossover
                user={this.props.user}
                guest={this.props.guest}
                participant={this.props.participant}
                study={this.props.study}
                task={this.props.task}
                onUpdateState={this.updateState}
                onToggleState={this.toggleState}
                agreeReceiveTaskUpdates={this.state.agreeReceiveTaskUpdates}
                updateResultMutation={updateResult}
                onSubmit={this.onGuestSubmit}
                nextTaskId={this.state.nextTaskId}
              />
            );
          }
          return (
            <Crossover
              user={this.props.user}
              guest={this.props.guest}
              participant={this.props.participant}
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
