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

import HiddenTokenSignup from '../../Sign/Token/hidden';
import TokenSignup from '../../Sign/Token/index';
import EmptyTokenSignup from '../../Sign/Token/empty';

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

          <ContainerOnlyForNoProfile>
            <h3>
              Please
              <Link
                href={{
                  pathname: `/signup/participant`,
                  query: { task: task.slug },
                }}
              >
                <StyledLink> sign up </StyledLink>
              </Link>
              as a participant or just
              <Link
                href={{
                  pathname: `/login`,
                  query: { task: task.slug },
                }}
              >
                <StyledLink> log in here </StyledLink>
              </Link>
              with your username.
            </h3>

            {false && (
              <>
                <p>
                  You can also participate as a guest (we will assign you a
                  different random username each time you participate).
                </p>
                <HiddenTokenSignup redirect={task.id} />
              </>
            )}
          </ContainerOnlyForNoProfile>

          <ContainerOnlyForProfile>
            <div>
              <fieldset>
                <label htmlFor="englishComprehension">
                  <input
                    type="checkbox"
                    id="englishComprehension"
                    name="englishComprehension"
                    onChange={this.saveToState}
                    checked={this.state.englishComprehension}
                  />
                  I understand basic instructions written in English
                </label>

                <h3>How would you like us to use your data?</h3>
                <div>
                  <label htmlFor="useDataForScience">
                    <input
                      type="radio"
                      id="useDataForScience"
                      name="data"
                      value="science"
                      onChange={this.updateState}
                      checked={this.state.data === 'science'}
                    />
                    You can use my data for science and/or educational purposes
                  </label>
                </div>
                <div>
                  <label htmlFor="educationalUse">
                    <input
                      type="radio"
                      id="educationalUse"
                      name="data"
                      value="education"
                      onChange={this.updateState}
                      checked={this.state.data === 'education'}
                    />
                    I want my data to be saved for educational use only (e.g.,
                    lectures and teaching materials)
                  </label>
                </div>
                <div>
                  <label htmlFor="doNotRecord">
                    <input
                      type="radio"
                      id="doNotRecord"
                      name="data"
                      value="no"
                      onChange={this.updateState}
                      checked={this.state.data === 'no'}
                    />
                    Don't record my data at all (if you’re a MindHive student:
                    this means your data won't be included in class demos!)
                  </label>
                </div>
                {this.state.data === 'science' && (
                  <div>
                    <label htmlFor="under18">
                      <input
                        type="checkbox"
                        id="under18"
                        name="under18"
                        onChange={this.saveToState}
                        checked={this.state.under18}
                      />
                      I am under the age of 18
                    </label>
                  </div>
                )}
                {this.state.data === 'science' && this.state.under18 && (
                  <div>
                    <label htmlFor="parentConsent">
                      Please ask your parent or guardian to check the box below
                      that they consent to your participation in this study.
                      <div>
                        <input
                          type="checkbox"
                          name="parentConsent"
                          id="parentConsent"
                          onChange={this.saveToState}
                          checked={this.state.parentConsent}
                        />
                        I consent
                      </div>
                    </label>
                  </div>
                )}

                <StyledButtons>
                  <Link
                    href={{
                      pathname: `/task/run`,
                      query: { id: task.id, policy: this.state.data },
                    }}
                  >
                    <button
                      disabled={
                        !this.state.englishComprehension ||
                        !this.state.data ||
                        (this.state.data === 'science' &&
                          this.state.under18 &&
                          !this.state.parentConsent)
                      }
                    >
                      <a>
                        <h2>
                          {!this.state.englishComprehension ||
                          !this.state.data ||
                          (this.state.data === 'science' &&
                            this.state.under18 &&
                            !this.state.parentConsent)
                            ? 'Please answer all the questions above'
                            : 'I am ready to participate in this study'}{' '}
                        </h2>
                      </a>
                    </button>
                  </Link>
                </StyledButtons>
              </fieldset>
            </div>
          </ContainerOnlyForProfile>

          {false && (
            <ContainerOnlyForStudents>
              <fieldset>
                <h3>
                  If you’ve already participated in this study, you can proceed
                  to the next step – creating your own research study. (If
                  you’re in a class, don’t proceed until the teacher has given
                  the green light)
                </h3>
                <StyledButtons>
                  <Link
                    href={{
                      pathname: '/task/customize',
                      query: { id: task.id },
                    }}
                  >
                    <button>
                      <a>
                        <h2>I am ready to create my own study</h2>
                      </a>
                    </button>
                  </Link>
                </StyledButtons>
              </fieldset>
            </ContainerOnlyForStudents>
          )}
        </StyledTask>
      </div>
    );
  }
}

export default TaskPage;
