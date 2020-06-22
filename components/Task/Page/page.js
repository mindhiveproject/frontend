import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import {
  StyledTask,
  StyledButtons,
  StyledLink,
  StyledTasks,
  StyledTaskLine,
} from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';
import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';

// import HiddenTokenSignup from '../../Sign/Token/hidden';
// import TokenSignup from '../../Sign/Token/index';
// import EmptyTokenSignup from '../../Sign/Token/empty';

class TaskPage extends Component {
  state = {
    under18: false,
    parentConsent: false,
    englishComprehension: false,
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { task } = this.props;

    return (
      <div>
        <StyledTask>
          <Head>
            <title>mindHIVE | {task.title}</title>
          </Head>
          <h2>{task.title}</h2>
          <p>{task.description}</p>

          <ContainerOnlyForScientists>
            <div>
              <fieldset>
                <StyledButtons>
                  <Link
                    href={{
                      pathname: `/tasks/run`,
                      query: { id: task.id, policy: 'preview' },
                    }}
                  >
                    <button>
                      <a>
                        <h2>Run test without saving the data</h2>
                      </a>
                    </button>
                  </Link>
                </StyledButtons>
              </fieldset>
            </div>
          </ContainerOnlyForScientists>

          <ContainerOnlyForNoProfile></ContainerOnlyForNoProfile>
          <ContainerOnlyForStudents></ContainerOnlyForStudents>
        </StyledTask>
      </div>
    );
  }
}

export default TaskPage;