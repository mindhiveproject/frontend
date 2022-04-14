import React, { Component } from 'react';
import Link from 'next/link';
import BirthdayPicker from '../../Utils/DatePicker/index';

import { OnboardingDetails } from '../styles';
import { ResponseButtons } from '../../SignFlow/styles';

class Demographics extends Component {
  state = {
    zip: '', // default of the page
    share: 'true', // default of the page
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
    guest: this.props.query.guest,
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
    const { user, study, query } = this.props;
    const { step, guest } = query;

    console.log('user', user);
    console.log('this.state', this.state);

    const hasConsent =
      study?.consent.length && study?.settings?.consentObtained;

    let zipDataAvailable;
    let studentsNYCAvailable;
    let sonaidDataAvailable;
    let engDataAvailable;
    let birthdayDataAvailable;

    if (user && user.generalInfo?.share == 'true') {
      const info = user.generalInfo;
      zipDataAvailable = info.zip && true;
      sonaidDataAvailable = info.sonaid && true;
      engDataAvailable = info.eng && true;
      birthdayDataAvailable = info.bd && true;
      studentsNYCAvailable = info.studentNYC && true;
    }

    return (
      <OnboardingDetails>
        <h1>Let's get started</h1>
        <h3>
          We are glad that you are interested in participating in "{study.title}
          ".
        </h3>

        {user?.generalInfo?.share !== 'true' && (
          <h3>To begin, please answer the following:</h3>
        )}

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
              <p className="translation">
                <em>
                  (La versión en español de la plataforma estará disponible en
                  poco tiempo.)
                </em>
              </p>
            </label>
          </div>
        )}
        {study?.settings?.askStudentsNYC && !studentsNYCAvailable && (
          <div>
            <label htmlFor="sonaid">
              <p className="questionTitle">
                Are you a student of a public school in NYC?
              </p>
              <ResponseButtons>
                <button
                  onClick={() => this.setStateToValue('studentNYC', 'yes')}
                  className={
                    this.state.studentNYC === 'yes' ? 'selectedBtn' : undefined
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => this.setStateToValue('studentNYC', 'no')}
                  className={
                    this.state.studentNYC === 'no' ? 'selectedBtn' : undefined
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
            <p className="questionTitle">What is your date of birth?</p>

            <BirthdayPicker onDateInput={this.setStateToValue} />
          </div>
        )}

        {(!user ||
          !user?.generalInfo?.share ||
          user?.generalInfo?.share == 'false') && (
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
                <span>Save my information for future studies</span>
              </div>
            </label>
          </div>
        )}

        {hasConsent ? (
          <Link
            href={{
              pathname: `/participate/consent`,
              query: { ...this.state, id: study.id },
            }}
          >
            <button>Next</button>
          </Link>
        ) : (
          <Link
            href={{
              pathname: `/participate/consent`,
              query: { ...this.state, id: study.id },
            }}
          >
            <button>Next</button>
          </Link>
        )}
      </OnboardingDetails>
    );
  }
}

export default Demographics;
