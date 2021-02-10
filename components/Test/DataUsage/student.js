import React, { Component } from 'react';

import styled from 'styled-components';

const StyledNotes = styled.div`
  background: #fff3cd;
  border-radius: 4px;

  p {
    padding: 20px;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }

  a {
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

class DataUsageForStudent extends Component {
  render() {
    return (
      <div>
        <h1>Data usage</h1>
        <h3>
          Do you want to allow MindHive researchers and educators to access your
          responses for this task?
        </h3>

        <div>
          <div className="checkboxField">
            <input
              type="radio"
              id="useDataForScience"
              name="data"
              value="science"
              onChange={this.props.updateState}
              checked={this.props.data === 'science'}
            />
            <label htmlFor="useDataForScience">
              Yes, for all uses - science, education, and community programs
            </label>
          </div>
          {this.props.data === 'science' && (
            <StyledNotes>
              <p>
                Note: MindHive researchers and educators are vetted by MindHive
                administrators and cannot access your personal data without your
                explicit consent. See our{' '}
                <a target="_blank" href="https://mindhive.science/docs/privacy">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a target="_blank" href="https://mindhive.science/docs/terms">
                  Terms and Conditions
                </a>{' '}
                for details on our commitment to protect your data.
              </p>
            </StyledNotes>
          )}
        </div>
        <div>
          <div className="checkboxField">
            <input
              type="radio"
              id="educationalUse"
              name="data"
              value="education"
              onChange={this.props.updateState}
              checked={this.props.data === 'education'}
            />
            <label htmlFor="educationalUse">
              Yes, but just for educational and community programs use
            </label>
          </div>
          {this.props.data === 'education' && (
            <StyledNotes>
              <p>
                Note: MindHive educators are vetted by MindHive administrators
                and cannot access your personal data without your explicit
                consent. See our{' '}
                <a target="_blank" href="https://mindhive.science/docs/privacy">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a target="_blank" href="https://mindhive.science/docs/terms">
                  Terms and Conditions
                </a>{' '}
                for details on our commitment to protect your data.
              </p>
            </StyledNotes>
          )}
        </div>
        <div>
          <div className="checkboxField">
            <input
              type="radio"
              id="onlyForMe"
              name="data"
              value="self"
              onChange={this.props.updateState}
              checked={this.props.data === 'self'}
            />
            <label htmlFor="onlyForMe">
              No, just save my responses for my own use
            </label>
          </div>
          {this.props.data === 'self' && (
            <StyledNotes>
              <p>
                Note: Your teacher will still have access to your responses.
                Choosing this option means your data won't be included in class
                demos
              </p>
            </StyledNotes>
          )}
        </div>
        <div>
          <div className="checkboxField">
            <input
              type="radio"
              id="doNotRecord"
              name="data"
              value="no"
              onChange={this.props.updateState}
              checked={this.props.data === 'no'}
            />
            <label htmlFor="doNotRecord">No, don't save my responses</label>
          </div>
          {this.props.data === 'no' && (
            <StyledNotes>
              <p>
                Note: Some MindHive features, like personalized data
                visualization might not be accessible to you if you choose this
                option
              </p>
            </StyledNotes>
          )}
        </div>
      </div>
    );
  }
}

export default DataUsageForStudent;
