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
  OnboardingModal,
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
import StudyConsentText from './Steps/4-studyConsentText';
import StudyConsentForm from './Steps/5-studyConsent';

import { Logo } from '../../Header/styles';

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
      <OnboardingModal>
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
                          this.state.englishComprehension &&
                          (this.state.zipCode ||
                            !this.props.study.settings.zipCode)
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
                      onNext={() =>
                        this.setState({ page: this.state.page + 1 })
                      }
                    />
                  </div>
                )}

                {this.state.page == 3 && (
                  <div id="page_3">
                    <ParentConsent
                      onClose={() => this.props.onClose()}
                      title={study.title}
                      consent={study.consent}
                      onNext={() => {
                        if (this.state.parentName && this.state.parentEmail) {
                          this.setState({
                            parentConsentGiven: true,
                            consentGiven: true,
                            page: this.state.page + 3,
                          });
                        }
                      }}
                    />
                  </div>
                )}

                {this.state.page == 4 && (
                  <div id="page_4">
                    <StudyConsentText
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
                          page: this.state.page + 2,
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
                    <StudyConsentForm
                      onClose={() => this.props.onClose()}
                      title={study.title}
                      consent={study.consent}
                      onNext={() =>
                        this.setState({
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
                      <Logo>
                        <div className="logo">
                          <img
                            src="/static/MindHive_logo.png"
                            alt="icon"
                            height="30"
                          />
                        </div>
                      </Logo>
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
      </OnboardingModal>
    );
  }
}

export default RegistrationPage;
