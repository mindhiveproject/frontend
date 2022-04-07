import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { OnboardingForm } from '../Study/styles';

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

    const showEmailNotificationPropmt =
      this.props.study?.settings?.showEmailNotificationPropmt || false;

    // check whether there is a next task
    const isNextTask = this.props.nextTaskId;
    const { task } = this.props;

    console.log('this.props', this.props);
    console.log('data', agreeReceiveUpdates, isEmailAvailable);

    return (
      <div>
        <OnboardingForm>
          {showEmailNotificationPropmt &&
            (!agreeReceiveUpdates || !isEmailAvailable) &&
            task?.taskType !== 'BLOCK' && (
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
                        I agree to be sent notifications related to this task
                        (you can opt out at any time!)
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
                      Your email address or any other personal information will
                      not be shared with researchers without your explicit
                      consent.
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
          </div>
          <p
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={e =>
              this.props.onSubmit(
                e,
                this.props.updateResultMutation,
                'studyPage'
              )
            }
          >
            Go back to the main study page
          </p>
        </OnboardingForm>
      </div>
    );
  }
}

export default Crossover;
