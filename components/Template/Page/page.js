import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { StyledTemplate } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';

class TemplatePage extends Component {
  render() {
    const { template } = this.props;
    const { tasks } = template;

    return (
      <div>
        <StyledTemplate>
          <Head>
            <title>MindHive | {template.title}</title>
          </Head>
          <h2>{template.title}</h2>
          <p>{template.description}</p>
        </StyledTemplate>
      </div>
    );
  }
}

export default TemplatePage;
