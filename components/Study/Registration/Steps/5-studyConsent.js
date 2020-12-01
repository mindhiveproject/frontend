import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import ReactHtmlParser from 'react-html-parser';
import { Logo } from '../../../Header/styles';

import { OnboardingHeader, StyledConsentForm } from '../../styles';

class StudyConsentForm extends Component {
  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { consent } = this.props;
    const publicStudies = consent?.studies.filter(study => study.public) || [];

    console.log('consent', consent);
    return (
      <StyledConsentForm>
        {this.props.showCloseButton && (
          <OnboardingHeader>
            <Logo>
              <div className="logo">
                <img src="/static/MindHive_logo.png" alt="icon" height="30" />
              </div>
            </Logo>
            <div className="headerTitle">Study consent</div>
            <a className="closeBtn" onClick={this.props.onClose}>
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

          {publicStudies.length ? (
            <div>
              <p>
                Tasks and surveys associated with the following studies are
                covered under this protocol
              </p>

              <div className="coveredStudiesAndTasks">
                {publicStudies.map(study => (
                  <li key={study.id}>{study.title}</li>
                ))}
              </div>

              {false && (
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
              )}
            </div>
          ) : (
            <div></div>
          )}

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
                  Save my consent for all covered studies/tasks (if you uncheck
                  this box, you will be prompted with this consent page each
                  time).
                </span>
              </div>
            </label>
          </div>
        </div>

        <button onClick={this.props.onNext}>Next</button>
      </StyledConsentForm>
    );
  }
}

export default StudyConsentForm;
