import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Accordion } from 'semantic-ui-react';
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
import TaskCard from './task';
import ParticipantLogin from '../../Login/Participant/index';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

class StudyPage extends Component {
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
        content: i.text,
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
                  <OnboardingHeader>
                    <div>Let's get started</div>
                    <a
                      style={{ cursor: 'pointer', textAlign: 'end' }}
                      onClick={() => this.props.onClose()}
                    >
                      &times;
                    </a>
                  </OnboardingHeader>
                  <h1>Let's get started</h1>
                  <h3>
                    We are glad that you are interested in participating in "How
                    are we impacted during COVID-19?". Before we begin, please
                    answer the following:
                  </h3>
                  {study.settings && study.settings.zipCode && (
                    <div>
                      <label htmlFor="zipCode">
                        <p>Your zip code</p>
                        <input
                          type="number"
                          id="zipCode"
                          name="zipCode"
                          onChange={this.updateState}
                        />
                      </label>
                    </div>
                  )}

                  <div>
                    <label htmlFor="englishComprehension">
                      <p>
                        Do you understand basic instruction written in English?
                      </p>
                      <ResponseButtons>
                        <button
                          onClick={() =>
                            this.setButtonState('englishComprehension', 'yes')
                          }
                          className={
                            this.state.englishComprehension === 'yes'
                              ? 'selectedBtn'
                              : undefined
                          }
                        >
                          Yes
                        </button>
                        <button
                          onClick={() =>
                            this.setButtonState('englishComprehension', 'no')
                          }
                          className={
                            this.state.englishComprehension === 'no'
                              ? 'selectedBtn'
                              : undefined
                          }
                        >
                          No
                        </button>
                      </ResponseButtons>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="under18">
                      <p>Are you under the age of 18?</p>

                      <ResponseButtons>
                        <button
                          onClick={() => this.setButtonState('under18', 'yes')}
                          className={
                            this.state.under18 === 'yes'
                              ? 'selectedBtn'
                              : undefined
                          }
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => this.setButtonState('under18', 'no')}
                          className={
                            this.state.under18 === 'no'
                              ? 'selectedBtn'
                              : undefined
                          }
                        >
                          No
                        </button>
                      </ResponseButtons>
                    </label>
                  </div>

                  <button
                    onClick={() => this.setState({ page: this.state.page + 1 })}
                  >
                    Next
                  </button>

                  <div>
                    <span>
                      <>Already have an account?</>
                      <> </>
                      <a
                        style={{
                          borderBottom: '1px solid grey',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          this.setState({ login: true });
                        }}
                      >
                        Login here
                      </a>
                    </span>
                  </div>
                </div>
              )}

              {this.state.page == 2 && (
                <div id="page_2">
                  <OnboardingHeader>
                    <div>Study consent</div>
                    <a
                      style={{ cursor: 'pointer', textAlign: 'end' }}
                      onClick={() => this.props.onClose()}
                    >
                      &times;
                    </a>
                  </OnboardingHeader>
                  <h1>Study consent</h1>
                  <Accordion
                    defaultActiveIndex={consentForm.map((c, i) => i)}
                    panels={consentForm}
                    exclusive={false}
                    fluid
                  />
                  <button
                    onClick={() => this.setState({ page: this.state.page + 1 })}
                  >
                    Next
                  </button>
                </div>
              )}

              {this.state.page == 3 && (
                <div id="page_3">
                  <OnboardingHeader>
                    <div>Data usage</div>
                    <a
                      style={{ cursor: 'pointer', textAlign: 'end' }}
                      onClick={() => this.props.onClose()}
                    >
                      &times;
                    </a>
                  </OnboardingHeader>
                  <h1>Data usage</h1>
                  <h3>How would you like us to use your data?</h3>
                  <div>
                    <div className="checkboxField">
                      <input
                        type="radio"
                        id="useDataForScience"
                        name="data"
                        value="science"
                        onChange={this.updateState}
                        checked={this.state.data === 'science'}
                      />
                      <label htmlFor="useDataForScience">
                        You can use my data for science and/or educational
                        purposes
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="checkboxField">
                      <input
                        type="radio"
                        id="educationalUse"
                        name="data"
                        value="education"
                        onChange={this.updateState}
                        checked={this.state.data === 'education'}
                      />
                      <label htmlFor="educationalUse">
                        I want my data to be saved for educational use only
                        (e.g., lectures and teaching materials)
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="checkboxField">
                      <input
                        type="radio"
                        id="doNotRecord"
                        name="data"
                        value="no"
                        onChange={this.updateState}
                        checked={this.state.data === 'no'}
                      />
                      <label htmlFor="doNotRecord">
                        Don't record my data at all (if you’re a MindHive
                        student: this means your data won't be included in class
                        demos!)
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => this.setState({ page: this.state.page + 1 })}
                  >
                    Next
                  </button>
                </div>
              )}

              {this.state.page == 4 && (
                <div id="page_4">
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

export default StudyPage;
