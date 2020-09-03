import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import ReactHtmlParser from 'react-html-parser';

import { OnboardingHeader } from '../../styles';

class StudyConsentForm extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <OnboardingHeader>
          <div>Study consent</div>
          <a
            style={{ cursor: 'pointer', textAlign: 'end' }}
            onClick={this.props.onClose}
          >
            &times;
          </a>
        </OnboardingHeader>
        <h1>Study consent</h1>

        <div>
          <p>
            This study <strong>{this.props.title}</strong> is covered under{' '}
            <strong>{this.props.consentTitle}</strong>. Before proceeding,
            please review the consent form here and save a copy for your
            records.
          </p>

          <p>{ReactHtmlParser(this.props.consentFormText)}</p>

          {this.props.coveredStudies.length ||
          this.props.coveredTasks.length ? (
            <div>
              <p>
                Other studies and tasks on MindHive that belong to this
                protocol:
              </p>

              {this.props.coveredStudies.length ? (
                <div>
                  <p>Studies</p>
                  {this.props.coveredStudies.map(study => (
                    <li key={study.id}>{study.title}</li>
                  ))}
                </div>
              ) : (
                <div></div>
              )}

              {this.props.coveredTasks.length ? (
                <div>
                  <p>Tasks</p>
                  {this.props.coveredTasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}

          {true && (
            <div>
              <label htmlFor="saveCoveredConsent">
                <div className="checkboxField">
                  <input
                    type="checkbox"
                    id="saveCoveredConsent"
                    name="saveCoveredConsent"
                    checked={this.props.saveCoveredConsent}
                    onChange={this.props.toggleState}
                  />
                  <span>
                    Save my consent for all covered studies/tasks (if you
                    uncheck this box, you will be prompted with this consent
                    page each time).
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>

        <button onClick={this.props.onNext}>I agree, next</button>
        <button onClick={this.props.onSkip}>Skip consent</button>
      </div>
    );
  }
}

export default StudyConsentForm;
