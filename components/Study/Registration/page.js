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
import BlockingPage from './Steps/blockingPage';
import { Logo } from '../../Header/styles';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

class RegistrationPage extends Component {
  // need to assign a between-subjects block and the id of the first task
  assignConditions = () => {
    const { study } = this.props;
    if (study?.components?.blocks) {
      // choose randomly one block
      const { blocks } = study.components;
      const block = blocks[Math.floor(Math.random() * blocks.length)];
      // return blockId, blockName and firstTaskId
      return {
        blockId: block.blockId,
        blockName: block.title,
        firstTaskId:
          block.tests && block.tests.length ? block.tests[0].id : undefined,
      };
    }
    return {
      firstTaskId:
        this.props.study?.components &&
        this.props.study?.components.length &&
        this.props.study?.components[0].id,
    };
  };

  state = {
    page: 1,
    login: false,
    sharePersonalDataWithOtherStudies: true,
    personalDataAvailable: false,
    zipCodeDataAvailable: false,
    sonaIdDataAvailable: false,
    saveCoveredConsent: true,
    ...this.assignConditions(),
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
      <OnboardingModal id="OnboardingModal">
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
                      personalDataAvailable={this.state.personalDataAvailable}
                      zipCodeDataAvailable={this.state.zipCodeDataAvailable}
                      sonaIdDataAvailable={this.state.sonaIdDataAvailable}
                      sonaParticipant={this.state.sonaParticipant}
                      onBtnClick={(parameter, state) =>
                        this.setButtonState(parameter, state)
                      }
                      onNext={() => {
                        if (
                          this.state.under18 &&
                          this.state.under18 === 'yes' &&
                          study?.settings?.minorsBlocked
                        ) {
                          this.setState({ page: 'block' });
                          return;
                        }
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
                      saveCoveredConsent={this.state.saveCoveredConsent}
                      toggleState={this.toggleState}
                      updateState={this.updateState}
                      sonaParticipant={this.state.sonaParticipant}
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
                      sonaParticipant={this.state.sonaParticipant}
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
                        className="closeBtn"
                        onClick={() => this.props.onClose()}
                      >
                        &times;
                      </a>
                    </OnboardingHeader>
                    <StudyRegistration
                      study={study}
                      user={{
                        zipCode: this.state.zipCode,
                        sonaParticipant: this.state.sonaParticipant,
                        sonaId: this.state.sonaId,
                        under18: this.state.under18,
                        englishComprehension: this.state.englishComprehension,
                        consentGiven: this.state.consentGiven,
                        saveCoveredConsent: this.state.saveCoveredConsent,
                        sharePersonalDataWithOtherStudies: this.state
                          .sharePersonalDataWithOtherStudies,
                        parentConsentGiven: this.state.parentConsentGiven,
                        parentName: this.state.parentName,
                        parentEmail: this.state.parentEmail,
                        blockId: this.state.blockId,
                        blockName: this.state.blockName,
                      }}
                      onClose={this.props.onClose}
                      onStartTheTask={this.props.onStartTheTask}
                      firstTaskId={this.state.firstTaskId}
                    />
                  </div>
                )}

                {this.state.page == 'block' && (
                  <div id="block">
                    <BlockingPage
                      onClose={() => this.props.onClose()}
                      header=""
                      message="We are very sorry but only participants who are 18 or older can take part in this study at this time."
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
                  sonaParticipant: this.state.sonaParticipant,
                  sonaId: this.state.sonaId,
                  under18: this.state.under18,
                  englishComprehension: this.state.englishComprehension,
                  consentGiven: this.state.consentGiven,
                  saveCoveredConsent: this.state.saveCoveredConsent,
                  sharePersonalDataWithOtherStudies: this.state
                    .sharePersonalDataWithOtherStudies,
                  parentConsentGiven: this.state.parentConsentGiven,
                  parentName: this.state.parentName,
                  parentEmail: this.state.parentEmail,
                  blockId: this.state.blockId,
                  blockName: this.state.blockName,
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
              blockId={this.state.blockId}
              blockName={this.state.blockName}
            />
          </ContainerOnlyForProfile>
        </OnboardingForm>
      </OnboardingModal>
    );
  }
}

export default RegistrationPage;
