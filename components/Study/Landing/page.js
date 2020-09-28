import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, Accordion } from 'semantic-ui-react';

import ReactHtmlParser from 'react-html-parser';
import { Query } from 'react-apollo';
import { StyledStudyPage, StyledLink, StyledButtons } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';
import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';
import RegistrationFlow from '../Registration/index';

import { ContainerOnlyForAuthorizedCollaborators } from '../../Permissions/Collaborator/index';

import StudyInformation from './studyInfo';
import StudyTasks from './studyTasks';

class StudyParticipantPage extends Component {
  state = { activePage: 'front' };

  register = () => {
    this.setState({
      activePage: 'registration',
    });
  };

  render() {
    const { study } = this.props;
    const { activeItem } = this.state;

    return (
      <>
        {this.state.activePage === 'front' && (
          <StyledStudyPage>
            <Head>
              <title>mindHIVE | {study.title}</title>
            </Head>

            <StudyTasks
              study={study}
              user={this.props.user || undefined}
              onStartTheTask={this.props.onStartTheTask}
              onStartExternalTask={this.props.onStartExternalTask}
            />

            <StudyInformation
              study={study}
              user={this.props.user || undefined}
              onRegister={() => this.register()}
            />
          </StyledStudyPage>
        )}
        {this.state.activePage === 'registration' && (
          <RegistrationFlow
            study={this.props.study}
            user={this.props.user}
            onStartTheTask={this.props.onStartTheTask}
            onClose={() => this.setState({ activePage: 'front' })}
          />
        )}
      </>
    );
  }
}

export default StudyParticipantPage;
