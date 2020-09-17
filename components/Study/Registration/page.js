import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Accordion } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import {
  StyledStudy,
  OnboardingForm,
  ResponseButtons,
  ResponseButton,
  OnboardingHeader,
} from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';
import StudyRegistration from './registration';
import StudyConsent from './consent';
import TaskCard from '../TaskCard/index';
import ParticipantLogin from '../../Login/Participant/index';

import GetStarted from './Steps/1-getStarted';
import PreParentConsent from './Steps/2-preParentConsent';
import ParentConsent from './Steps/3-parentConsent';
import StudyConsentForm from './Steps/4-studyConsent';
import StudyConsentFormText from './Steps/5-studyConsentText';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

class RegistrationPage extends Component {
  state = {
    page: 1,
    login: false,
    sharePersonalDataWithOtherStudies: true,
    saveCoveredConsent: true,
    firstTaskId:
      this.props.study?.tasks &&
      this.props.study?.tasks.length &&
      this.props.study?.tasks[0].id,
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  setButtonState = (name, value) => {
    this.setState({
      [name]: value,
    });
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

  render() {
    const { study, user } = this.props;
    const { tasks } = study;

    return (
      <OnboardingForm>
        <Head>
          <title>mindHIVE | {study.title}</title>
        </Head>
        <ContainerOnlyForNoProfile>
          {!this.state.login && (
            <>
              {this.state.page == 1 && (
                <div id="page_1">
                  <GetStarted
                    study={study}
                    updateState={this.updateState}
                    toggleState={this.toggleState}
                    englishComprehension={this.state.englishComprehension}
                    under18={this.state.under18}
                    sharePersonalDataWithOtherStudies={
                      this.state.sharePersonalDataWithOtherStudies
                    }
                    onBtnClick={(parameter, state) =>
                      this.setButtonState(parameter, state)
                    }
                    onNext={() => {
                      if (
                        this.state.under18 &&
                        this.state.englishComprehension
                      ) {
                        // if there is an IRB consent in the study
                        if (study.consent) {
                          if (this.state.under18 === 'yes') {
                            this.setState({ page: this.state.page + 1 });
                          }
                          if (this.state.under18 === 'no') {
                            this.setState({ page: this.state.page + 3 });
                          }
                        } else {
                          // otherwise if there is no IRB consent, jump to the next stage
                          this.setState({ page: this.state.page + 5 });
                        }
                      }
                    }}
                    onLogin={() => {
                      this.setState({ login: true });
                    }}
                    onClose={() => this.props.onClose()}
                    showLogin
                  />
                </div>
              )}

              {this.state.page == 2 && (
                <div id="page_2">
                  <PreParentConsent
                    onClose={() => this.props.onClose()}
                    onNext={() => this.setState({ page: this.state.page + 1 })}
                  />
                </div>
              )}

              {this.state.page == 3 && (
                <div id="page_3">
                  <ParentConsent
                    onClose={() => this.props.onClose()}
                    title={this.props.study.title}
                    updateState={this.updateState}
                    onNext={() => {
                      if (this.state.parentName && this.state.parentEmail) {
                        this.setState({
                          parentConsentGiven: true,
                          consentGiven: true,
                          page: this.state.page + 3,
                        });
                      }
                    }}
                    consentFormText={
                      study.info &&
                      study.info.length &&
                      study.info
                        .filter(info => info.name === 'consentForm')
                        .map(info => info.text)
                    }
                    consentTitle={study.consent?.title || []}
                    coveredStudies={study.consent?.studies || []}
                    coveredTasks={study.consent?.tasks || []}
                  />
                </div>
              )}

              {this.state.page == 4 && (
                <div id="page_4">
                  <StudyConsentForm
                    onClose={() => this.props.onClose()}
                    title={study.title}
                    consent={study.consent}
                    onNext={() =>
                      this.setState({
                        consentGiven: true,
                        page: this.state.page + 1,
                      })
                    }
                    toggleState={this.toggleState}
                    saveCoveredConsent={this.state.saveCoveredConsent}
                    showCloseButton
                  />
                </div>
              )}

              {this.state.page == 5 && (
                <div id="page_5">
                  <StudyConsentFormText
                    onClose={() => this.props.onClose()}
                    title={study.title}
                    consent={study.consent}
                    onNext={() =>
                      this.setState({
                        consentGiven: true,
                        page: this.state.page + 1,
                      })
                    }
                    onSkip={() =>
                      this.setState({
                        consentGiven: false,
                        page: this.state.page + 1,
                      })
                    }
                    toggleState={this.toggleState}
                    saveCoveredConsent={this.state.saveCoveredConsent}
                    showCloseButton
                  />
                </div>
              )}

              {this.state.page == 6 && (
                <div id="page_6">
                  <OnboardingHeader>
                    <div>Account creation</div>
                    <a
                      style={{ cursor: 'pointer', textAlign: 'end' }}
                      onClick={() => this.props.onClose()}
                    >
                      &times;
                    </a>
                  </OnboardingHeader>
                  <StudyRegistration
                    study={study}
                    user={{
                      zipCode: this.state.zipCode,
                      under18: this.state.under18,
                      englishComprehension: this.state.englishComprehension,
                      consentGiven: this.state.consentGiven,
                      saveCoveredConsent: this.state.saveCoveredConsent,
                      sharePersonalDataWithOtherStudies: this.state
                        .sharePersonalDataWithOtherStudies,
                      parentConsentGiven: this.state.parentConsentGiven,
                      parentEmail: this.state.parentEmail,
                      parentName: this.state.parentName,
                    }}
                    onClose={this.props.onClose}
                    onStartTheTask={this.props.onStartTheTask}
                    firstTaskId={this.state.firstTaskId}
                  />
                </div>
              )}
            </>
          )}

          {this.state.login && (
            <ParticipantLogin
              redirect={study.slug}
              user={{
                zipCode: this.state.zipCode,
                under18: this.state.under18,
                englishComprehension: this.state.englishComprehension,
                consentGiven: this.state.consentGiven,
                saveCoveredConsent: this.state.saveCoveredConsent,
                sharePersonalDataWithOtherStudies: this.state
                  .sharePersonalDataWithOtherStudies,
                parentConsentGiven: this.state.parentConsentGiven,
                parentEmail: this.state.parentEmail,
                parentName: this.state.parentName,
              }}
              study={study}
              onClose={this.props.onClose}
              onStartTheTask={this.props.onStartTheTask}
              firstTaskId={this.state.firstTaskId}
            />
          )}
        </ContainerOnlyForNoProfile>

        <ContainerOnlyForProfile>
          <StudyConsent
            study={this.props.study}
            user={this.props.user}
            info={this.props.user?.generalInfo}
            onClose={this.props.onClose}
            onStartTheTask={this.props.onStartTheTask}
            firstTaskId={this.state.firstTaskId}
          />
        </ContainerOnlyForProfile>
      </OnboardingForm>
    );
  }
}

export default RegistrationPage;
//
// class StudyPageForUser extends Component {
//   render() {
//     const { study, user } = this.props;
//     const studyIds = user.participantIn.map(study => study.id);
//     const policy = user.generalInfo?.data || 'preview';
//     const fullResultsInThisStudy = user.results
//       .filter(
//         result =>
//           result.study &&
//           result.study.id === study.id &&
//           result.payload === 'full'
//       )
//       .map(result => result.task.id);
//     // if (studyIds.includes(study.id)) {
//     //   return (
//     //     <div>
//     //       {study.tasks &&
//     //         study.tasks.map((task, num) => (
//     //           <TaskCard
//     //             user={user}
//     //             key={num}
//     //             task={task}
//     //             policy={policy.data}
//     //             studyId={study.id}
//     //             completed={fullResultsInThisStudy.includes(task.id)}
//     //           />
//     //         ))}
//     //     </div>
//     //   );
//     // }
//     return (
//       <StudyConsent
//         study={study}
//         user={user}
//         info={user && user.generalInfo}
//         onClose={this.props.onClose}
//       />
//     );
//   }
// }
