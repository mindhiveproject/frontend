import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import ReactHtmlParser from 'react-html-parser';
import { OnboardingHeader, StyledConsentForm } from '../styles';
import { Logo } from '../../Header/styles';

import JoinStudy from '../JoinStudy';

class StudyConsent extends Component {
  state = {
    covered: false, // default of the page for saving of covered consent
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { study, user } = this.props;
    const { consent } = study;
    const publicStudies = consent?.studies.filter(study => study.public) || [];

    // compute whether the person is under 18
    let under18;
    if (this.state.bd) {
      const diff = Date.now() - this.state.bd;
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.2425;
      under18 = diff / millisecondsInYear < 18;
    }

    const regularAdultsConsent =
      consent?.info
        .filter(info => info.name === 'regularAdults')
        .map(info => info.text) || '';

    const sonaAdultsConsent =
      consent?.info
        .filter(info => info.name === 'sonaAdults')
        .map(info => info.text) || '';

    const regularMinorsConsent =
      consent?.info
        .filter(info => info.name === 'regularMinors')
        .map(info => info.text) || '';

    const sonaMinorsConsent =
      consent?.info
        .filter(info => info.name === 'sonaMinors')
        .map(info => info.text) || '';

    const regularMinorsKidsConsent =
      consent?.info
        .filter(info => info.name === 'regularMinorsKids')
        .map(info => info.text) || null;

    const sonaMinorsKidsConsent =
      consent?.info
        .filter(info => info.name === 'sonaMinorsKids')
        .map(info => info.text) || null;

    return (
      <div>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>
          <div>Study consent</div>
          <Link
            href={{
              pathname: `/studies/${study.slug}`,
            }}
          >
            <a className="closeBtn">&times;</a>
          </Link>
        </OnboardingHeader>

        <StyledConsentForm>
          {under18 && (
            <>
              <h1>Parental consent required</h1>
              <h3>
                Because you are under the age of 18, we need to get consent from
                your parent to proceed. Please ask your parent to complete this
                page.
              </h3>
              {(this.state.sona === 'no' ||
                typeof this.state.sona === 'undefined') && (
                <div>{ReactHtmlParser(regularMinorsConsent)}</div>
              )}

              {this.state.sona === 'yes' && (
                <div>{ReactHtmlParser(sonaMinorsConsent)}</div>
              )}

              <div>
                <label htmlFor="parentname">
                  <p>Parent name</p>
                  <input
                    type="text"
                    id="parentname"
                    name="parentname"
                    onChange={this.updateState}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="parentemail">
                  <p>Parent email address</p>
                  <input
                    type="email"
                    id="parentemail"
                    name="parentemail"
                    onChange={this.updateState}
                  />
                </label>
              </div>
            </>
          )}

          {under18 &&
            ((regularMinorsKidsConsent.length && regularMinorsKidsConsent[0]) ||
              (sonaMinorsKidsConsent.length && sonaMinorsKidsConsent[0])) && (
              <>
                <h1>Your consent required</h1>
                <h3>
                  Because you are under the age of 18, we need to get consent
                  from you as well. Please enter your name below if you consent.
                </h3>
                {(this.state.sona === 'no' ||
                  typeof this.state.sona === 'undefined') && (
                  <div>{ReactHtmlParser(regularMinorsKidsConsent)}</div>
                )}

                {this.state.sona === 'yes' && (
                  <div>{ReactHtmlParser(sonaMinorsKidsConsent)}</div>
                )}

                <div>
                  <label htmlFor="kidname">
                    <p>Your name</p>
                    <input
                      type="text"
                      id="kidname"
                      name="kidname"
                      onChange={this.updateState}
                    />
                  </label>
                </div>
              </>
            )}

          {!under18 && (
            <>
              <h1>Study consent</h1>
              {(this.state.sona === 'no' ||
                typeof this.state.sona === 'undefined') && (
                <div>{ReactHtmlParser(regularAdultsConsent)}</div>
              )}

              {this.state.sona === 'yes' && (
                <div>{ReactHtmlParser(sonaAdultsConsent)}</div>
              )}
            </>
          )}

          {consent && (
            <>
              <div>
                <p>
                  This study is part of the{' '}
                  <strong>{consent?.organization}</strong> research protocol{' '}
                  <strong>{consent?.title}</strong>.
                </p>

                {publicStudies.length ? (
                  <div>
                    <p>
                      Tasks and surveys associated with the following studies
                      are covered under this protocol
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
                  <label htmlFor="covered">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="covered"
                        name="covered"
                        checked={this.state.covered}
                        onChange={this.toggleState}
                      />
                      <span>
                        Save my consent for all covered studies/tasks (if you
                        uncheck this box, you will be prompted with this consent
                        page each time).
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {user && <JoinStudy study={study} info={this.state} />}

          {!user && (
            <>
              <Link
                href={{
                  pathname: `/join/howtojoin`,
                  query: { ...this.state, consent: true, id: study.id },
                }}
              >
                <div className="buttonsHolder">
                  <button>I agree, next</button>
                </div>
              </Link>

              <Link
                href={{
                  pathname: `/join/howtojoin`,
                  query: { ...this.state, consent: false, id: study.id },
                }}
              >
                <a>
                  <p>Skip consent</p>
                </a>
              </Link>
            </>
          )}
        </StyledConsentForm>
      </div>
    );
  }
}

export default StudyConsent;
