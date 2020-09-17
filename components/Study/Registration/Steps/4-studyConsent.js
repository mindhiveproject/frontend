import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import ReactHtmlParser from 'react-html-parser';

import { OnboardingHeader, StyledConsentForm } from '../../styles';

class StudyConsentForm extends Component {
  render() {
    const { consent } = this.props;
    return (
      <StyledConsentForm>
        {this.props.showCloseButton && (
          <OnboardingHeader>
            <div>Study consent</div>
            <a
              style={{ cursor: 'pointer', textAlign: 'end' }}
              onClick={this.props.onClose}
            >
              &times;
            </a>
          </OnboardingHeader>
        )}

        <h1>Study consent</h1>

        <div>
          <p>
            This study is part of the <strong>{consent.organization}</strong>{' '}
            research protocol <strong>{consent.title}</strong>.
          </p>

          {consent.studies.length || consent.tasks.length ? (
            <div>
              <p>
                Studies and tasks on MindHive that are covered under this
                protocol include:
              </p>

              <div className="coveredStudiesAndTasks">
                {consent.studies.length ? (
                  <div>
                    <p>Studies</p>
                    {consent.studies.map(study => (
                      <li key={study.id}>{study.title}</li>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="coveredStudiesAndTasks">
                {consent.tasks.length ? (
                  <div>
                    <p>Tasks</p>
                    {consent.tasks.map(task => (
                      <li key={task.id}>{task.title}</li>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
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

        <button onClick={this.props.onNext}>Next</button>
      </StyledConsentForm>
    );
  }
}

export default StudyConsentForm;
