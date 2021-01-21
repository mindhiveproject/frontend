import React, { Component, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { OnboardingHeader, ResponseButtons } from '../styles';
import { Logo } from '../../Header/styles';

import BirthdayPicker from '../../Utils/DatePicker/index';

import JoinStudy from '../JoinStudy';

class GetStarted extends Component {
  state = {
    zip: '', // default of the page
    share: 'true', // default of the page
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setStateToValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  isUnder18 = birthdayTimestamp => {
    const diff = Date.now() - birthdayTimestamp;
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.2425;
    return diff / millisecondsInYear < 18;
  };

  render() {
    const { study, user } = this.props;
    // calculate whether the user already provided the demographics data and agreed to share it
    let zipDataAvailable;
    let sonaidDataAvailable;
    let engDataAvailable;
    let birthdayDataAvailable;
    if (user && user.generalInfo?.share == 'true') {
      const info = user.generalInfo;
      zipDataAvailable = info.zip && true;
      sonaidDataAvailable = info.sonaid && true;
      engDataAvailable = info.eng && true;
      birthdayDataAvailable = info.bd && true;
    }

    return (
      <div>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>
          <div>Let's get started</div>
          <Link
            href={{
              pathname: `/studies/${study.slug}`,
            }}
          >
            <a className="closeBtn">&times;</a>
          </Link>
        </OnboardingHeader>

        <h1>Let's get started</h1>
        <h3>
          We are glad that you are interested in participating in "{study.title}
          ".
        </h3>
        {false && <h3>Before we begin, please answer the following:</h3>}
        {study?.settings?.zipCode && !zipDataAvailable && (
          <div>
            <label htmlFor="zip">
              <p className="questionTitle">Your zip code</p>
              <input
                type="number"
                id="zip"
                name="zip"
                onChange={this.updateState}
                value={this.state.zip}
              />
            </label>
          </div>
        )}

        {study?.settings?.sonaId && !sonaidDataAvailable && (
          <div>
            <label htmlFor="sonaid">
              <p className="questionTitle">Are you an NYU SONA participant?</p>
              <ResponseButtons>
                <button
                  onClick={() => this.setStateToValue('sona', 'yes')}
                  className={
                    this.state.sona === 'yes' ? 'selectedBtn' : undefined
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => this.setStateToValue('sona', 'no')}
                  className={
                    this.state.sona === 'no' ? 'selectedBtn' : undefined
                  }
                >
                  No
                </button>
              </ResponseButtons>
            </label>
          </div>
        )}

        {study?.settings?.sonaId && this.state.sona === 'yes' && (
          <div>
            <label htmlFor="sonaid">
              <p className="questionTitle">What is your NYU ID?</p>
              <span>
                By entering your ID, we can ensure that you will receive course
                credit for your participation in this study.
              </span>
              <input
                type="text"
                id="sonaid"
                name="sonaid"
                onChange={this.updateState}
              />
            </label>
          </div>
        )}

        {!engDataAvailable && (
          <div>
            <label htmlFor="eng">
              <p className="questionTitle">
                Do you understand basic instruction written in English?
              </p>
              <p>
                (La versión en español de la plataforma estará disponible en
                poco tiempo.)
              </p>
              <ResponseButtons>
                <button
                  onClick={() => this.setStateToValue('eng', 'yes')}
                  className={
                    this.state.eng === 'yes' ? 'selectedBtn' : undefined
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => this.setStateToValue('eng', 'no')}
                  className={
                    this.state.eng === 'no' ? 'selectedBtn' : undefined
                  }
                >
                  No
                </button>
              </ResponseButtons>
            </label>
          </div>
        )}

        {!birthdayDataAvailable && (
          <div>
            <p className="questionTitle">When is your birthday?</p>

            <BirthdayPicker onDateInput={this.setStateToValue} />
          </div>
        )}

        {(!user || user?.generalInfo?.share == 'false') && (
          <div>
            <label htmlFor="share">
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="share"
                  name="share"
                  checked={this.state.share == 'true'}
                  onChange={() =>
                    this.setStateToValue(
                      'share',
                      this.state.share == 'true' ? 'false' : 'true'
                    )
                  }
                />
                <span>
                  Save this info for future studies/tasks (if you uncheck this
                  box, you will be asked these questions for each study/task;
                  you can always change your settings under your Account
                  Settings).
                </span>
              </div>
            </label>
          </div>
        )}

        {study.settings?.minorsBlocked && this.isUnder18(this.state.bd) ? (
          <Link
            href={{
              pathname: `/join/sorry`,
              query: { ...this.state, id: study.id, under18: true },
            }}
          >
            <button>Next</button>
          </Link>
        ) : (
          <>
            {study.consent && study.settings?.consentObtained ? (
              <Link
                href={{
                  pathname: `/join/studyconsent`,
                  query: { ...this.state, id: study.id },
                }}
              >
                <button>Next</button>
              </Link>
            ) : (
              <>
                {user ? (
                  <JoinStudy study={study} info={this.state} />
                ) : (
                  <Link
                    href={{
                      pathname: `/join/howtojoin`,
                      query: { ...this.state, id: study.id },
                    }}
                  >
                    <button>Next</button>
                  </Link>
                )}
              </>
            )}
          </>
        )}

        {!user && (
          <div>
            <span>
              <>Already have an account?</>
              <> </>
              <Link
                href={{
                  pathname: `/join/sign`,
                  query: {
                    mode: 'login',
                    id: study.id,
                  },
                }}
              >
                <a
                  style={{
                    borderBottom: '1px solid grey',
                    cursor: 'pointer',
                  }}
                >
                  Login here
                </a>
              </Link>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default GetStarted;
