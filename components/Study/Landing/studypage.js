import React, { Component } from 'react';
import Head from 'next/head';
import { StyledStudyPage } from '../styles';
import StudyInformation from './studyInfo';

class StudyParticipantPage extends Component {
  state = {};

  render() {
    const { study } = this.props;
    return (
      <StyledStudyPage>
        <Head>
          <title>MindHive | {study.title}</title>
        </Head>

        <StudyInformation
          study={study}
          user={this.props.user}
          onStartTheTask={this.props.onStartTheTask}
          onStartExternalTask={this.props.onStartExternalTask}
        />
      </StyledStudyPage>
    );
  }
}

export default StudyParticipantPage;
