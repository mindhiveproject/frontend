import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { StyledStudy } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';

class StudyParticipantPage extends Component {
  render() {
    const { study } = this.props;
    const { tasks } = study;

    return (
      <div>
        <StyledStudy>
          <Head>
            <title>mindHIVE | {study.title}</title>
          </Head>
          <div>
            <h2>{study.title}</h2>
            <p>{study.description}</p>
          </div>
          <div>
            {study.tasks &&
              study.tasks.map((task, num) => <div key={num}>{task}</div>)}
          </div>
        </StyledStudy>
      </div>
    );
  }
}

export default StudyParticipantPage;
