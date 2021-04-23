import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
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

class TaskPage extends Component {
  render() {
    const { task } = this.props;

    return (
      <div>
        <StyledTask>
          <Head>
            <title>mindHIVE | {task.title}</title>
          </Head>
          <h2>{task.title}</h2>
          <div>{ReactHtmlParser(task.description)}</div>

          <ContainerOnlyForScientists>
            <div>
              <fieldset>
                <StyledButtons>
                  <Link
                    href={{
                      pathname: `/task/preview`,
                      query: { id: task.id },
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
          <ContainerOnlyForStudents>
            <div>For students</div>
            <Link
              href={{
                pathname: '/task/add',
                query: { id: task.template?.id },
              }}
            >
              <a>
                <h2>
                  <button>Create a new task based on this template</button>
                </h2>
              </a>
            </Link>
          </ContainerOnlyForStudents>
        </StyledTask>
      </div>
    );
  }
}

export default TaskPage;
