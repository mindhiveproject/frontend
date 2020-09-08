import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import { ResponseButtons, OnboardingHeader } from '../../styles';

class ParentConsent extends Component {
  render() {
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
        <h1>Parental consent required</h1>

        <p>
          This study <strong>{this.props.title}</strong> is covered under{' '}
          <strong>{this.props.consentTitle}</strong>. Before proceeding, please
          review the consent form here and save a copy for your records.
        </p>

        <p>{ReactHtmlParser(this.props.consentFormText)}</p>

        {this.props.coveredStudies.length || this.props.coveredTasks.length ? (
          <div>
            <p>
              Other studies and tasks on MindHive that belong to this protocol:
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

        <button onClick={this.props.onNext}>I agree, next</button>
        <p>
          By clicking "I agree, next" your are consenting to let your child be
          in the research study described above.
        </p>
      </div>
    );
  }
}

export default ParentConsent;
