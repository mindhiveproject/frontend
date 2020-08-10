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
import StudyConsentForm from './Steps/4-studyConsent';
import DataUsage from './Steps/5-dataUsage';

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
    // console.log('res', res);
    this.props.onClose();
    // Router.push('/studies/[slug]', `/studies/${this.props.study.slug}`);
    Router.push({
      pathname: '/tasks/run',
      as: `/tasks/run`,
      query: {
        id:
          this.props.study.tasks &&
          this.props.study.tasks.length &&
          this.props.study.tasks.map(task => task.id)[0],
        policy: this.state.data || 'fallback',
        study: this.props.study.id,
        s: this.props.study.slug,
      },
    });
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
                <GetStarted
                  study={study}
                  updateState={this.updateState}
                  englishComprehension={this.state.englishComprehension}
                  under18={this.state.under18}
                  onBtnClick={(parameter, state) =>
                    this.setButtonState(parameter, state)
                  }
                  onNext={() => {
                    if (this.state.under18 && this.state.englishComprehension) {
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
                  onNext={e => this.saveJoinStudy(e, joinStudy)}
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
