import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  OnboardingForm,
  ResponseButtons,
  OnboardingHeader,
} from '../../Study/styles';

class Crossover extends Component {
  render() {
    const thankYouMessage =
      this.props.study.info &&
      this.props.study.info
        .filter(i => i.name === 'thankYouMessage' && i.text)
        .map(i => i.text)
        .map(i => ReactHtmlParser(i));

    const isEmailAvailable =
      this.props.user?.authEmail &&
      this.props.user?.authEmail.length &&
      this.props.user?.authEmail[0].email;
    const agreeReceiveUpdates = this.props.user?.generalInfo
      ?.agreeReceiveUpdates;
    // check whether there is a next task
    const isNextTask = this.props.nextTaskId;
    return (
      <div>
        <OnboardingForm>
          {(!agreeReceiveUpdates || !isEmailAvailable) && (
            <div>
              <div>
                <label htmlFor="agreeReceiveTaskUpdates">
                  <div className="checkboxField">
                    <input
                      type="checkbox"
                      id="agreeReceiveTaskUpdates"
                      name="agreeReceiveTaskUpdates"
                      checked={this.props.agreeReceiveTaskUpdates}
                      onChange={this.props.onToggleState}
                    />
                    <span>
                      I agree to be sent notifications related to this task (you
                      can opt out at any time!)
                    </span>
                  </div>
                </label>
              </div>
              {this.props.agreeReceiveTaskUpdates && !isEmailAvailable && (
                <div>
                  <label htmlFor="email">
                    <p>Please enter your email address here: </p>
                    <input
                      className="emailInput"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={this.props.email}
                      onChange={this.props.onUpdateState}
                    />
                  </label>
                  <p>
                    This email address will be linked to your automatically
                    generated username and password.
                  </p>
                </div>
              )}
            </div>
          )}

          {thankYouMessage}

          <div className="buttonsHolder">
            {isNextTask && (
              <button
                onClick={e =>
                  this.props.onSubmit(
                    e,
                    this.props.updateResultMutation,
                    'nextTask'
                  )
                }
              >
                Proceed to the next task
              </button>
            )}
            <button
              onClick={e =>
                this.props.onSubmit(
                  e,
                  this.props.updateResultMutation,
                  'studyPage'
                )
              }
            >
              Go back to the main study page
            </button>
          </div>
        </OnboardingForm>
      </div>
    );
  }
}

export default Crossover;
