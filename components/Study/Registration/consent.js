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

import GetStarted from './Steps/1-getStarted';
import PreParentConsent from './Steps/2-preParentConsent';
import ParentConsent from './Steps/3-parentConsent';
import StudyConsentText from './Steps/4-studyConsentText';
import StudyConsentForm from './Steps/5-studyConsent';
import JoinStudy from './Steps/6-joinStudy';

const JOIN_STUDY = gql`
  mutation JOIN_STUDY($id: ID!, $info: Json, $user: Json, $study: Json) {
    joinStudy(id: $id, info: $info, user: $user, study: $study) {
      message
    }
  }
`;

class StudyConsent extends Component {
  getIntitialPage = () => {
    let page = 1; // demo questions
    const { study } = this.props;
    if (this.props.user.generalInfo?.sharePersonalDataWithOtherStudies) {
      if (
        typeof this.props.user.generalInfo?.zipCode !== 'undefined' &&
        typeof this.props.user.generalInfo?.under18 !== 'undefined' &&
        typeof this.props.user.generalInfo?.englishComprehension !== 'undefined'
      ) {
        if (study.consent) {
          if (this.props.user.generalInfo?.under18 === 'yes') {
            page = 2;
          } else {
            const consentId = this.props?.study?.consent?.id;
            const userConsent =
              this.props.user?.consentsInfo &&
              this.props.user.consentsInfo[consentId];
            if (userConsent && userConsent.saveCoveredConsent) {
              page = 5;
            } else {
              page = 4;
            }
          }
        } else {
          page = 6;
        }
      }
    }
    return page;
  };

  state = {
    page: this.getIntitialPage(),
    zipCode: this.props.user && this.props.user.generalInfo?.zipCode,
    age: this.props.user && this.props.user.generalInfo?.age,
    under18: this.props.user && this.props.user.generalInfo?.under18,
    englishComprehension:
      this.props.user && this.props.user.generalInfo?.englishComprehension,
    sharePersonalDataWithOtherStudies:
      this.props.user &&
      this.props.user.generalInfo?.sharePersonalDataWithOtherStudies,
    saveCoveredConsent: true,
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

  saveJoinStudy = async (e, joinStudyMutation, consentGiven) => {
    e.preventDefault();
    const res = await joinStudyMutation({
      variables: {
        id: this.props.study.id,
        user: {
          zipCode: this.state.zipCode,
          age: this.state.age,
          under18: this.state.under18,
          englishComprehension: this.state.englishComprehension,
          sharePersonalDataWithOtherStudies: this.state
            .sharePersonalDataWithOtherStudies,
          saveCoveredConsent: this.state.saveCoveredConsent,
          consentGiven,
        },
        study: this.props.study,
      },
    });
    this.props.onClose();

    if (this.props.study?.settings?.proceedToFirstTask) {
      this.props.onStartTheTask(this.props.firstTaskId);
    }
  };

  render() {
    const { study } = this.props;
    const { user } = this.props;

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
                    if (this.state.under18 && this.state.englishComprehension) {
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
                  showLogin={false}
                  info={this.props.info}
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
                  title={study.title}
                  consent={study.consent}
                  updateState={this.updateState}
                  onNext={e => {
                    if (this.state.parentName && this.state.parentEmail) {
                      this.saveJoinStudy(e, joinStudy, true);
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
                  onNext={e => {
                    this.setState({
                      consentGiven: true,
                      page: this.state.page + 1,
                    });
                  }}
                  onSkip={e => {
                    this.setState({
                      consentGiven: false,
                      page: this.state.page + 2,
                    });
                  }}
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
                  onNext={e => {
                    this.saveJoinStudy(e, joinStudy, this.state.consentGiven);
                  }}
                  toggleState={this.toggleState}
                  saveCoveredConsent={this.state.saveCoveredConsent}
                  showCloseButton
                />
              </div>
            )}

            {this.state.page == 6 && (
              <div id="page_6">
                <JoinStudy
                  onClose={() => this.props.onClose()}
                  onNext={e => {
                    this.saveJoinStudy(e, joinStudy, false);
                  }}
                />
              </div>
            )}
          </OnboardingForm>
        )}
      </Mutation>
    );
  }
}

export default StudyConsent;
