import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledStudy } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';
import StudyRegistration from './registration';
import StudyConsent from './consent';
import TaskCard from './task';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
// const CURRENT_USER_STUDIES = gql`
//   query CURRENT_USER_STUDIES {
//     me {
//       id
//       username
//       permissions
//       participantIn {
//         id
//       }
//       info
//     }
//   }
// `;

class StudyPage extends Component {
  state = {
    page: 1,
    under18: false,
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
    const { study } = this.props;
    const { tasks } = study;

    return (
      <div>
        <StyledStudy>
          <Head>
            <title>mindHIVE | {study.title}</title>
          </Head>

          <ContainerOnlyForNoProfile>
            <Link
              href={{
                pathname: `/study/${study.slug}`,
              }}
            >
              <a>X</a>
            </Link>
            {this.state.page == 1 && (
              <div id="page_1">
                <h1>Let's get started</h1>
                <p>We are glad that you are interested ...</p>
                <fieldset>
                  <div>
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
                  </div>
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
                </fieldset>
                <button
                  onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                  Next
                </button>
              </div>
            )}

            {this.state.page == 2 && (
              <div id="page_2">
                <h1>Study consent</h1>
                <p>Accordeon with the information here ...</p>
                <button
                  onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                  Next
                </button>
              </div>
            )}

            {this.state.page == 3 && (
              <div id="page_3">
                <h1>Data usage</h1>
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
                <button
                  onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                  Next
                </button>
              </div>
            )}

            {this.state.page == 4 && (
              <div id="page_4">
                <h1>Account creation</h1>
                <StudyRegistration study={study} user={this.state} />
              </div>
            )}
          </ContainerOnlyForNoProfile>

          <ContainerOnlyForProfile>
            <Query query={CURRENT_USER_RESULTS_QUERY}>
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading</p>;
                if (!data.me)
                  return <p>No information found for your profile.</p>;
                const { me } = data;
                console.log('me', me);
                const studyIds = me.participantIn.map(study => study.id);
                // console.log('studyIds', studyIds);
                const policy = (me.info && me.info[study.id]) || 'preview';

                const fullResultsInThisStudy = me.results
                  .filter(
                    result =>
                      result.study.id === study.id && result.payload === 'full'
                  )
                  .map(result => result.task.id);
                console.log('fullResultsInThisStudy', fullResultsInThisStudy);
                // console.log('study.tasks', study.tasks);
                // console.log('policy', policy);
                if (studyIds.includes(study.id)) {
                  return (
                    <div>
                      Registered
                      {study.tasks &&
                        study.tasks.map((task, num) => (
                          <TaskCard
                            key={num}
                            task={task}
                            policy={policy.data}
                            studyId={study.id}
                            completed={fullResultsInThisStudy.includes(task.id)}
                          />
                        ))}
                    </div>
                  );
                }
                return <StudyConsent study={study} />;
              }}
            </Query>
          </ContainerOnlyForProfile>
        </StyledStudy>
      </div>
    );
  }
}

export default StudyPage;
// export { CURRENT_USER_STUDIES };
// <div>
//   <h3>Tasks</h3>{' '}
//   {study.tasks &&
//     study.tasks.map((task, num) => (
//       <div key={num}>{task.title}</div>
//     ))}
// </div>
