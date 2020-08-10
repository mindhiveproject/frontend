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
import DataUsage from './Steps/5-dataUsage';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

class RegistrationPage extends Component {
  state = {
    page: 1,
    login: false,
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

  render() {
    const { study } = this.props;
    const { tasks } = study;
    const consentForm = this.props.study.info
      .filter(i => i.name.startsWith('faq'))
      .map(i => ({
        key: `panel-${i.name}`,
        title: i.header,
        content: ReactHtmlParser(i.text),
      }));

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
                    englishComprehension={this.state.englishComprehension}
                    under18={this.state.under18}
                    onBtnClick={(parameter, state) =>
                      this.setButtonState(parameter, state)
                    }
                    onNext={() => {
                      if (
                        this.state.under18 &&
                        this.state.englishComprehension
                      ) {
                        if (this.state.under18 === 'yes') {
                          this.setState({ page: this.state.page + 1 });
                        }
                        if (this.state.under18 === 'no') {
                          this.setState({ page: this.state.page + 3 });
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
                    consentForm={consentForm}
                    predefinedConsentForm={
                      this.props.study.info &&
                      this.props.study.info
                        .filter(info => info.name === 'consentFormForParents')
                        .map(info => info.text)
                    }
                    title={this.props.study.title}
                    updateState={this.updateState}
                    onNext={() => {
                      if (this.state.parentName && this.state.parentEmail) {
                        this.setState({ page: this.state.page + 2 });
                      }
                    }}
                  />
                </div>
              )}

              {this.state.page == 4 && (
                <div id="page_4">
                  <StudyConsentForm
                    onClose={() => this.props.onClose()}
                    consentForm={consentForm}
                    onNext={() => this.setState({ page: this.state.page + 1 })}
                    title={this.props.study.title}
                    predefinedConsentForm={
                      this.props.study.info &&
                      this.props.study.info
                        .filter(info => info.name === 'consentForm')
                        .map(info => info.text)
                    }
                  />
                </div>
              )}

              {this.state.page == 5 && (
                <div id="page_5">
                  <DataUsage
                    onClose={() => this.props.onClose()}
                    updateState={this.updateState}
                    data={this.state.data}
                    onNext={() => this.setState({ page: this.state.page + 1 })}
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
                      data: this.state.data,
                    }}
                    onClose={this.props.onClose}
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
                data: this.state.data,
              }}
              study={study}
              onClose={this.props.onClose}
            />
          )}
        </ContainerOnlyForNoProfile>

        <ContainerOnlyForProfile>
          <Query query={CURRENT_USER_RESULTS_QUERY} pollInterval={5000}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.me)
                return <p>No information found for your profile.</p>;
              const { me } = data;

              const studyIds = me.participantIn.map(study => study.id);

              const policy = (me.info && me.info[study.id]) || 'preview';

              const fullResultsInThisStudy = me.results
                .filter(
                  result =>
                    result.study.id === study.id && result.payload === 'full'
                )
                .map(result => result.task.id);

              console.log('me', me);

              if (studyIds.includes(study.id)) {
                return (
                  <div>
                    {study.tasks &&
                      study.tasks.map((task, num) => (
                        <TaskCard
                          key={num}
                          task={task}
                          policy={policy.data}
                          studyId={study.id}
                          completed={fullResultsInThisStudy.includes(task.id)}
                          user={me}
                        />
                      ))}
                  </div>
                );
              }
              return (
                <StudyConsent
                  study={study}
                  info={me && me.info && me.info.general}
                  onClose={this.props.onClose}
                />
              );
            }}
          </Query>
        </ContainerOnlyForProfile>
      </OnboardingForm>
    );
  }
}

export default RegistrationPage;
