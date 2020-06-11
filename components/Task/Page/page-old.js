import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { StyledTask } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';

class TaskPage extends Component {
  render() {
    const { task } = this.props;
    const { tasks } = task;

    return (
      <div>
        <StyledTask>
          <Head>
            <title>mindHIVE | {task.title}</title>
          </Head>
          <h2>{task.title}</h2>
          <p>{task.description}</p>

          <Link
            href={{
              pathname: '/task/run',
              query: { id: task.id, policy: 'science' },
            }}
          >
            <a>
              <h2>Start the task</h2>
            </a>
          </Link>
        </StyledTask>
      </div>
    );
  }
}

export default TaskPage;
