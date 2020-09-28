import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import {
  ResponseButtons,
  OnboardingHeader,
  StyledConsentForm,
} from '../../styles';
import { Logo } from '../../../Header/styles';

class ParentConsent extends Component {
  render() {
    const { consent } = this.props;
    const minorAdultsConsent =
      consent?.info
        .filter(info => info.name === 'regularMinors')
        .map(info => info.text) || '';

    return (
      <StyledConsentForm>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>
          <div>Study consent</div>
          <a
            style={{ cursor: 'pointer', textAlign: 'end' }}
            onClick={this.props.onClose}
          >
            &times;
          </a>
        </OnboardingHeader>
        <h1>Parental consent required</h1>

        <div>
          <p>
            This study is part of the <strong>{consent.organization}</strong>{' '}
            research protocol <strong>{consent.title}</strong>.
          </p>

          <p>{ReactHtmlParser(minorAdultsConsent)}</p>

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

          <div>
            <label htmlFor="parentName">
              <p>Your name</p>
              <input
                type="text"
                id="parentName"
                name="parentName"
                onChange={this.props.updateState}
              />
            </label>
          </div>

          <div>
            <label htmlFor="parentEmail">
              <p>Your email address</p>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                onChange={this.props.updateState}
              />
            </label>
          </div>

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

        <button onClick={this.props.onNext}>I agree, next</button>
        <p>
          By clicking "I agree, next" your are consenting to let your child be
          in the research study described above.
        </p>
      </StyledConsentForm>
    );
  }
}

export default ParentConsent;
