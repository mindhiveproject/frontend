import React, { Component } from 'react';
import Head from 'next/head';
import { StyledStudyPage } from '../styles';
import StudyInformation from './studyInfo';

class StudyPage extends Component {
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
          inReview={this.props.inReview}
          guestCode={this.props.guestCode}
        />
      </StyledStudyPage>
    );
  }
}

export default StudyPage;
