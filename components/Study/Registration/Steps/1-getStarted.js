import React, { Component } from 'react';

import { ResponseButtons, OnboardingHeader } from '../../styles';

class GetStarted extends Component {
  render() {
    return (
      <div>
        <OnboardingHeader>
          <div>Let's get started</div>
          <a
            style={{ cursor: 'pointer', textAlign: 'end' }}
            onClick={this.props.onClose}
          >
            &times;
          </a>
        </OnboardingHeader>
        <h1>Let's get started</h1>
        <h3>
          We are glad that you are interested in participating in "
          {this.props.study.title}
          ". Before we begin, please answer the following:
        </h3>
        {this.props.study.settings &&
          this.props.study.settings.zipCode &&
          !(this.props.info && this.props.info.zipcode) && (
            <div>
              <label htmlFor="zipCode">
                <p>Your zip code</p>
                <input
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  onChange={this.props.updateState}
                />
              </label>
            </div>
          )}

        {!(this.props.info && this.props.info.englishComprehension) && (
          <div>
            <label htmlFor="englishComprehension">
              <p>Do you understand basic instruction written in English?</p>
              <ResponseButtons>
                <button
                  onClick={() =>
                    this.props.onBtnClick('englishComprehension', 'yes')
                  }
                  className={
                    this.props.englishComprehension === 'yes'
                      ? 'selectedBtn'
                      : undefined
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() =>
                    this.props.onBtnClick('englishComprehension', 'no')
                  }
                  className={
                    this.props.englishComprehension === 'no'
                      ? 'selectedBtn'
                      : undefined
                  }
                >
                  No
                </button>
              </ResponseButtons>
            </label>
          </div>
        )}

        {!(this.props.info && this.props.info.under18) && (
          <div>
            <label htmlFor="under18">
              <p>Are you under the age of 18?</p>

              <ResponseButtons>
                <button
                  onClick={() => this.props.onBtnClick('under18', 'yes')}
                  className={
                    this.props.under18 === 'yes' ? 'selectedBtn' : undefined
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => this.props.onBtnClick('under18', 'no')}
                  className={
                    this.props.under18 === 'no' ? 'selectedBtn' : undefined
                  }
                >
                  No
                </button>
              </ResponseButtons>
            </label>
          </div>
        )}

        <button onClick={this.props.onNext}>Next</button>

        {this.props.showLogin && (
          <div>
            <span>
              <>Already have an account?</>
              <> </>
              <a
                style={{
                  borderBottom: '1px solid grey',
                  cursor: 'pointer',
                }}
                onClick={this.props.onLogin}
              >
                Login here
              </a>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default GetStarted;