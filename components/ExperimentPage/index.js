import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import {
  StyledExperiment,
  StyledButtons,
  StyledLink,
  StyledCustomExperiments,
  StyledCustomExperimentLine,
} from './styles';
import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../Permissions/Participant/index';

import HiddenTokenSignup from '../Sign/Token/hidden';
import TokenSignup from '../Sign/Token/index';
import EmptyTokenSignup from '../Sign/Token/empty';

class ExperimentPage extends Component {
  state = {
    under18: false,
    parentConsent: false,
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  render() {
    const { exp } = this.props;
    const isCustom = !!(exp.data && exp.data.length);
    const { customExperiments } = exp;
    return (
      <div>
        <StyledExperiment>
          <Head>
            <title>mindHIVE | {exp.title}</title>
          </Head>
          <h2>{exp.title}</h2>
          <p>{exp.description}</p>

          <ContainerOnlyForNoProfile>
            <h3>
              Please
              <Link
                href={{
                  pathname: '/sign/token',
                }}
              >
                <StyledLink> sign up </StyledLink>
              </Link>
              as a participant or just
              <Link
                href={{
                  pathname: '/login/token',
                }}
              >
                <StyledLink> log in here </StyledLink>
              </Link>
              with your username.
            </h3>
            <p>
              You can also participate as a guest. In this case, you'll have a
              different random username each time you participate.
            </p>
            <HiddenTokenSignup redirect={exp.id} isCustom={isCustom} />
          </ContainerOnlyForNoProfile>

          <ContainerOnlyForStudents>
            <div>
              <h2>How to go through Experiment</h2>
              You are both participant and student of the experiment, so you
              learn how to design experiments yourself. As you go through the
              experiment, pay attention to the following:
              <ol>
                <li>
                  <strong>Phrasing:</strong> What are the instructions and how
                  are they phrased?
                </li>
                <li>
                  <strong>Actions:</strong> What kinds of actions can you as a
                  participant take?
                </li>
                <li>
                  <strong>Sequence of tasks:</strong> What is the order of tasks
                  you go through as a participant?
                </li>
                <li>
                  <strong>Possible measures:</strong> What kind of data might be
                  collected?
                </li>
              </ol>
            </div>
          </ContainerOnlyForStudents>

          <ContainerOnlyForProfile>
            <div>
              <fieldset>
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
                {this.state.under18 && (
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
              </fieldset>
            </div>

            <StyledButtons>
              <Link
                href={{
                  pathname: `${isCustom ? '/e' : '/exp/run'}`,
                  query: { id: exp.id },
                }}
              >
                <button
                  disabled={this.state.under18 && !this.state.parentConsent}
                >
                  <a>
                    <h2>Participate in experiment</h2>
                  </a>
                </button>
              </Link>

              <Link
                href={{
                  pathname: `${isCustom ? '/e' : '/exp/run'}`,
                  query: { id: exp.id, preview: true },
                }}
              >
                <button
                  disabled={this.state.under18 && !this.state.parentConsent}
                >
                  <a>
                    <h2>Participate in experiment without saving data</h2>
                  </a>
                </button>
              </Link>
            </StyledButtons>
          </ContainerOnlyForProfile>

          {!isCustom && (
            <ContainerOnlyForStudents>
              <h3>
                If you have already participated in the experiment, you can
                proceed to the next step - creating your own experiment.
              </h3>
              <StyledButtons>
                <Link
                  href={{
                    pathname: '/bank/customize',
                    query: { id: exp.id },
                  }}
                >
                  <button>
                    <a>
                      <h2>Create your own experiment</h2>
                    </a>
                  </button>
                </Link>
              </StyledButtons>
            </ContainerOnlyForStudents>
          )}
        </StyledExperiment>

        {customExperiments && customExperiments.length > 0 && (
          <StyledCustomExperiments>
            <h2>Experiments created based on {exp.title}</h2>
            {customExperiments.map(parameter => (
              <StyledCustomExperimentLine key={parameter.id}>
                <Link
                  href={{
                    pathname: '/custom',
                    query: { id: parameter.id },
                  }}
                >
                  <a>
                    <h3>{parameter.title}</h3>
                    <p>created by {parameter.author.username}</p>
                  </a>
                </Link>
                <p>updated {moment(parameter.updatedAt).fromNow()}</p>
                <Link
                  href={{
                    pathname: '/custom',
                    query: { id: parameter.id },
                  }}
                >
                  <button>
                    <a>
                      <h2>Go to experiment page</h2>
                    </a>
                  </button>
                </Link>
                <Link
                  href={{
                    pathname: '/e',
                    query: { id: parameter.id },
                  }}
                >
                  <button>
                    <a>
                      <h2>Participate</h2>
                    </a>
                  </button>
                </Link>
              </StyledCustomExperimentLine>
            ))}
          </StyledCustomExperiments>
        )}
      </div>
    );
  }
}

export default ExperimentPage;
