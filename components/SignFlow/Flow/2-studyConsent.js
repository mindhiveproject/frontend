import React, { Component } from 'react';
import Link from 'next/link';

import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

import { OnboardingHeader } from '../styles';
import { Logo } from '../../Header/styles';

import JoinStudy from '../JoinStudy';

import ConsentScreen from './consentScreen';
import joinStudyRedirect from '../JoinStudyRedirect';

const JOIN_STUDY = gql`
  mutation JOIN_STUDY($id: ID!, $info: Json, $study: Json) {
    joinStudy(id: $id, info: $info, study: $study) {
      id
      username
      permissions
      studiesInfo
    }
  }
`;

class StudyConsent extends Component {
  state = {
    covered: false, // default of the page for saving of covered consent
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
    numberOfConsents: this.props.study?.consent.length,
    activeConsent: 0,
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

  recordMyConsent = async (consentId, decision, join) => {
    if (this.state.activeConsent + 1 < this.state.numberOfConsents) {
      this.setState({
        [`consent-${consentId}`]: decision,
        activeConsent: this.state.activeConsent + 1,
      });
    } else if (this.props.user) {
      const res = await join({
        variables: {
          id: this.props.study.id,
          info: this.state,
          study: this.props.study,
        },
      });
      const { joinStudy } = res.data;
      joinStudyRedirect(this.props.study, joinStudy);
    } else {
      Router.push({
        pathname: `/join/howtojoin`,
        query: {
          ...this.state,
          [`consent-${consentId}`]: decision,
          id: this.props.study.id,
        },
      });
    }
  };

  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { study, user } = this.props;
    const { consent } = study;

    // compute whether the person is under 18
    let under18;
    if (this.state.bd) {
      const diff = Date.now() - this.state.bd;
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.2425;
      under18 = diff / millisecondsInYear < 18;
    }

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

        <Mutation
          mutation={JOIN_STUDY}
          refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
        >
          {(joinStudy, { loading, error }) => (
            <ConsentScreen
              under18={under18}
              consent={consent[this.state.activeConsent]}
              sona={this.state.sona}
              studentNYC={this.state.studentNYC}
              covered={this.state.covered}
              updateState={this.updateState}
              consentNumber={this.state.activeConsent}
              numberOfConsents={this.state.numberOfConsents}
              recordMyConsent={this.recordMyConsent}
              joinStudy={joinStudy}
            >
              <>
                {under18 && (
                  <>
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
              </>
            </ConsentScreen>
          )}
        </Mutation>
      </div>
    );
  }
}

export default StudyConsent;

// {false && (
//   <>
//     {user && <JoinStudy study={study} info={this.state} />}
//
//     {!user && (
//       <>
//         <Link
//           href={{
//             pathname: `/join/howtojoin`,
//             query: { ...this.state, consent: true, id: study.id },
//           }}
//         >
//           <div className="buttonsHolder">
//             <button>I agree, next</button>
//           </div>
//         </Link>
//
//         <Link
//           href={{
//             pathname: `/join/howtojoin`,
//             query: { ...this.state, consent: false, id: study.id },
//           }}
//         >
//           <a>
//             <p>Skip consent</p>
//           </a>
//         </Link>
//       </>
//     )}
//   </>
// )}
