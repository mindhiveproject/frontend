import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import {
  OnboardingForm,
  ResponseButtons,
  OnboardingHeader,
} from '../../Study/styles';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import Crossover from './crossover';
import StudyConsentForm from '../../Study/Registration/Steps/4-studyConsent';

const UPDATE_RESULTS_INFO_MUTATION = gql`
  mutation UPDATE_RESULTS_INFO_MUTATION($id: ID!, $info: Json) {
    updateResultsInfo(id: $id, info: $info) {
      message
    }
  }
`;

class PostPrompt extends Component {
  checkConsent = () => {
    const { consent } = this.props.task;
    console.log('consent', consent);
    console.log(
      'this.props.user.consentGivenFor',
      this.props.user.consentGivenFor
    );
    let isConsentGiven = false;
    if (consent && consent.id) {
      const userConsents = this.props.user.consentGivenFor.map(c => c.id);
      isConsentGiven = userConsents.includes(consent.id);
    }
    console.log('isConsentGiven', isConsentGiven);
    return isConsentGiven;
  };

  checkDataAgreement = () => {
    // check that the data agreement is present
    const userDataPolicy = this.props.user?.generalInfo?.data || undefined;
    return userDataPolicy;
  };

  checkNextTaskId = () => {
    const fullResultsInThisStudy =
      this.props.user?.results
        .filter(
          result =>
            result.study &&
            result.study.id === this.props.study.id &&
            result.payload === 'full'
        )
        .map(result => result.task.id) || [];
    const notCompletedTasks = this.props.study.tasks.filter(
      task => !fullResultsInThisStudy.includes(task.id)
    );
    let nextTaskId;
    if (notCompletedTasks && notCompletedTasks.length > 1) {
      nextTaskId = notCompletedTasks[1].id;
    }
    return nextTaskId;
  };

  state = {
    data: this.checkDataAgreement(),
    agreeReceiveTaskUpdates: true,
    consentResponseGiven: this.checkConsent(),
    saveCoveredConsent: true,
    nextTaskId: this.checkNextTaskId(),
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  onNext = () => {
    this.setState({
      consentResponseGiven: true,
    });
  };

  onSubmit = async (e, updateResultsMutation, redirect) => {
    console.log('submit data', this.state);
    e.preventDefault();
    const res = await updateResultsMutation({
      variables: {
        id: this.props.token,
        info: {
          email: this.state.email, // to update the email of the user
          data: this.state.data,
          task: {
            id: this.props.task.id,
            data: this.state.data,
            agreeReceiveTaskUpdates: this.state.agreeReceiveTaskUpdates,
            consentGiven: this.state.consentGiven,
            saveCoveredConsent: this.state.saveCoveredConsent,
          },
          consent: {
            id: this.state.consentId,
            consentGiven: this.state.consentGiven,
            saveCoveredConsent: this.state.saveCoveredConsent,
          },
        },
      },
    });
    console.log('res', res);

    // return back to the study page or continue to the next task
    if (this.props.slug) {
      if (redirect === 'studyPage') {
        this.props.onEndTask();
      } else if (redirect === 'nextTask' && this.state.nextTaskId) {
        this.props.onStartTheTask(this.state.nextTaskId);
      }
      this.props.onClosePrompt();
    }
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_RESULTS_INFO_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(updateResult, { error }) => {
          const { study, user, task } = this.props;
          console.log('study, user, task', study, user, task);

          if (!this.state.consentResponseGiven) {
            return (
              <div>
                <OnboardingForm>
                  <h1>Thank you for participating in this task!</h1>
                  <h1>Data usage</h1>
                  <h3>How would you like us to use your data?</h3>

                  <div>
                    <div className="checkboxField">
                      <input
                        type="radio"
                        id="useDataForScience"
                        name="data"
                        value="science"
                        onChange={this.updateState}
                        checked={this.state.data === 'science'}
                      />
                      <label htmlFor="useDataForScience">
                        You can use my data for science and/or educational
                        purposes
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="checkboxField">
                      <input
                        type="radio"
                        id="educationalUse"
                        name="data"
                        value="education"
                        onChange={this.updateState}
                        checked={this.state.data === 'education'}
                      />
                      <label htmlFor="educationalUse">
                        I want my data to be saved for educational use only
                        (e.g., lectures and teaching materials)
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="checkboxField">
                      <input
                        type="radio"
                        id="doNotRecord"
                        name="data"
                        value="no"
                        onChange={this.updateState}
                        checked={this.state.data === 'no'}
                      />
                      <label htmlFor="doNotRecord">
                        Don't record my data at all (if you’re a MindHive
                        student: this means your data won't be included in class
                        demos!)
                      </label>
                    </div>
                  </div>

                  {this.state.data === 'science' && (
                    <div>
                      <p>
                        You agreed to use your data for scientific purposes,
                        please consider providing consent.
                      </p>
                      <StudyConsentForm
                        onClose={() => {
                          console.log('closing');
                        }}
                        title={study.title}
                        consentTitle={task.consent.title}
                        coveredStudies={task.consent.studies || []}
                        coveredTasks={task.consent.tasks || []}
                        onNext={e => {
                          this.setState({
                            consentGiven: true,
                            consentId: task.consent.id,
                          });
                          this.onNext();
                        }}
                        onSkip={e => {
                          this.setState({
                            consentGiven: false,
                          });
                          this.onNext();
                        }}
                        consentFormText="bla bla"
                        toggleState={this.toggleState}
                        saveCoveredConsent={this.state.saveCoveredConsent}
                      />
                    </div>
                  )}

                  {this.state.data !== 'science' && (
                    <button onClick={() => this.onNext()}>Next</button>
                  )}
                </OnboardingForm>
              </div>
            );
          }
          return (
            <Crossover
              user={this.props.user}
              onUpdateState={this.updateState}
              onToggleState={this.toggleState}
              agreeReceiveTaskUpdates={this.state.agreeReceiveTaskUpdates}
              updateResultMutation={updateResult}
              onSubmit={this.onSubmit}
              nextTaskId={this.state.nextTaskId}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default PostPrompt;

// {false && (
//   <>
//     <p>
//       Before proceeding, we'd like to confirm with you that
//       you're ok with other MindHive researchers linking your
//       responses to their study. This will prevent that you
//       have to answer the same questions multiple times.
//     </p>
//     <p>
//       Recall that (a) you always have to right to request that
//       your data be removed, at any time and for any reason (b)
//       we will never sell your data (c) we will never share any
//       identifiable data (name, email address, etc.).
//     </p>
//     <div>
//       <div className="checkboxField">
//         <input
//           type="radio"
//           id="linkToAll"
//           name="linking"
//           value="all"
//           onChange={this.updateState}
//           checked={this.state.linking === 'all'}
//         />
//         <label htmlFor="linkToAll">
//           Other researchers may link my MindHive data to their
//           study
//         </label>
//       </div>
//     </div>
//     <div>
//       <div className="checkboxField">
//         <input
//           type="radio"
//           id="linkToStudy"
//           name="linking"
//           value="study"
//           onChange={this.updateState}
//           checked={this.state.linking === 'study'}
//         />
//         <label htmlFor="linkToStudy">
//           I only want my data to be linked to the study{' '}
//           {this.props.slug}
//         </label>
//       </div>
//     </div>
//   </>
// )}
