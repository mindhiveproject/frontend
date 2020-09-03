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

        <p>{ReactHtmlParser(this.props.consentFormText)}</p>

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
