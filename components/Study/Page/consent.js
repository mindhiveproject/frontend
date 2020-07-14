import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Accordion } from 'semantic-ui-react';
import Router from 'next/router';
import ReactHtmlParser from 'react-html-parser';
import {
  StyledStudy,
  OnboardingForm,
  ResponseButtons,
  ResponseButton,
  OnboardingHeader,
} from '../styles';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import StudyConsentForm from './studyconsent';

const JOIN_STUDY = gql`
  mutation JOIN_STUDY($id: ID!, $info: Json) {
    joinStudy(id: $id, info: $info) {
      message
    }
  }
`;

class StudyConsent extends Component {
  state = {
    page: 1,
    zipcode: this.props.info && this.props.info.zipcode,
    under18: this.props.info && this.props.info.under18,
    englishComprehension:
      this.props.info && this.props.info.englishComprehension,
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

  saveJoinStudy = async (e, joinStudyMutation) => {
    e.preventDefault();
    const res = await joinStudyMutation({
      variables: {
        id: this.props.study.id,
        info: {
          zipcode: this.state.zipcode,
          under18: this.state.under18,
          englishComprehension: this.state.englishComprehension,
          data: this.state.data,
        },
      },
    });
    this.props.onClose();
    Router.push('/study/[slug]', `/study/${this.props.study.slug}`);
  };

  render() {
    const { study } = this.props;
    const consentForm = this.props.study.info
      .filter(i => i.name.startsWith('faq'))
      .map(i => ({
        key: `panel-${i.name}`,
        title: i.header,
        content: ReactHtmlParser(i.text),
      }));
    return (
      <Mutation
        mutation={JOIN_STUDY}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(joinStudy, { loading, error }) => (
          <OnboardingForm>
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
                  We are glad that you are interested in participating in "
                  {study.title}". Before we begin, please answer the following:
                </h3>

                {!(this.props.info && this.props.info.zipcode) && (
                  <div>
                    <label htmlFor="zipcode">
                      <p>Your zip code</p>
                      <input
                        type="number"
                        id="zipcode"
                        name="zipcode"
                        value={this.state.zipcode}
                        onChange={this.updateState}
                      />
                    </label>
                  </div>
                )}

                {!(this.props.info && this.props.info.englishComprehension) && (
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
                )}

                {!(this.props.info && this.props.info.under18) && (
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
                )}

                <button
                  onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                  Next
                </button>
              </div>
            )}

            {this.state.page == 2 && (
              <div id="page_2">
                <StudyConsentForm
                  onClose={() => this.props.onClose()}
                  consentForm={consentForm}
                  onNext={() => this.setState({ page: this.state.page + 1 })}
                  title={this.props.study.title}
                />
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
                      I want my data to be saved for educational use only (e.g.,
                      lectures and teaching materials)
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
                      Don't record my data at all (if you’re a MindHive student:
                      this means your data won't be included in class demos!)
                    </label>
                  </div>
                </div>

                <button onClick={e => this.saveJoinStudy(e, joinStudy)}>
                  I am ready to participate in this study
                </button>
              </div>
            )}
          </OnboardingForm>
        )}
      </Mutation>
    );
  }
}

export default StudyConsent;
