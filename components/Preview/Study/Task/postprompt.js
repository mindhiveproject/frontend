import React, { Component } from 'react';

import { OnboardingForm } from '../../../Study/styles';
import Crossover from './crossover';
import StudyConsentText from '../../../Study/Registration/Steps/4-studyConsentText';
import StudyConsentForm from '../../../Study/Registration/Steps/5-studyConsent';

import DataUsageForStudent from './DataUsage/student';
import DataUsageForParticipant from './DataUsage/participant';

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

  checkWhetherToShowDataUsageQuestion = () => {
    const isStudent = this.props?.user?.permissions?.includes('STUDENT');
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

  onSubmit = async (e, redirect) => {
    e.preventDefault();
    // return back to the study page or continue to the next task
    if (redirect === 'studyPage') {
      this.props.onEndTask();
    } else if (redirect === 'nextTask') {
      this.props.onStartTheTask({
        componentId: this.props.user.nextTaskId,
        versionId: this.props.user.nextVersionId,
      });
    }
  };

  render() {
    const { study, user, task } = this.props;
    const isStudent = user?.permissions?.includes('STUDENT');

    // show data usage prompt
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
                    You agreed to use your data for scientific purposes, please
                    consider providing consent.
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
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default PostPrompt;
