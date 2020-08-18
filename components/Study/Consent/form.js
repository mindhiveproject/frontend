import React, { Component } from 'react';

import {
  StyledTaskForm,
  StyledTaskBlock,
  ControlButtons,
} from '../../Task/styles';
import { ResponseButtons, OnboardingForm } from '../styles';

class EditStudyConsentForm extends Component {
  state = {
    zipcode: this.props.info && this.props.info.zipcode,
    under18: this.props.info && this.props.info.under18,
    englishComprehension:
      this.props.info && this.props.info.englishComprehension,
    data: this.props.info && this.props.info.data,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  setButtonState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <OnboardingForm>
        <h1>{this.props.title}</h1>

        {this.state.zipcode && (
          <div>
            <label htmlFor="zipcode">
              <p>Your zip code</p>
              <input
                type="number"
                id="zipcode"
                name="zipcode"
                value={this.state.zipcode}
                onChange={this.handleChange}
              />
            </label>
          </div>
        )}

        <div>
          <label htmlFor="englishComprehension">
            <p>Do you understand basic instruction written in English?</p>
            <ResponseButtons>
              <button
                onClick={e =>
                  this.setButtonState('englishComprehension', 'yes')
                }
                className={
                  this.state.englishComprehension === 'yes'
                    ? 'selectedBtn'
                    : undefined
                }
              >
                Yes
              </button>
              <button
                onClick={() =>
                  this.setButtonState('englishComprehension', 'no')
                }
                className={
                  this.state.englishComprehension === 'no'
                    ? 'selectedBtn'
                    : undefined
                }
              >
                No
              </button>
            </ResponseButtons>
          </label>
        </div>
        <div>
          <label htmlFor="under18">
            <p>Are you under the age of 18?</p>

            <ResponseButtons>
              <button
                onClick={() => this.setButtonState('under18', 'yes')}
                className={
                  this.state.under18 === 'yes' ? 'selectedBtn' : undefined
                }
              >
                Yes
              </button>
              <button
                onClick={() => this.setButtonState('under18', 'no')}
                className={
                  this.state.under18 === 'no' ? 'selectedBtn' : undefined
                }
              >
                No
              </button>
            </ResponseButtons>
          </label>
        </div>
        <h3>Data usage</h3>
        <div>
          <div className="checkboxField">
            <input
              type="radio"
              id="useDataForScience"
              name="data"
              value="science"
              onChange={this.handleChange}
              checked={this.state.data === 'science'}
            />
            <label htmlFor="useDataForScience">
              You can use my data for science and/or educational purposes
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
              onChange={this.handleChange}
              checked={this.state.data === 'education'}
            />
            <label htmlFor="educationalUse">
              I want my data to be saved for educational use only (e.g.,
              lectures and teaching materials)
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
              onChange={this.handleChange}
              checked={this.state.data === 'no'}
            />
            <label htmlFor="doNotRecord">
              Don't record my data at all (if you’re a MindHive student: this
              means your data won't be included in class demos!)
            </label>
          </div>
        </div>

        <button
          onClick={e => this.props.onSubmit(e, this.state, this.props.callback)}
        >
          Sav{this.props.loading ? 'ing' : 'e'} changes
        </button>
      </OnboardingForm>
    );
  }
}

export default EditStudyConsentForm;
