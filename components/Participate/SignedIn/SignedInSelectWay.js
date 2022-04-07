import React, { Component } from 'react';
import Link from 'next/link';

import { StyledWaySelector } from '../styles';

class SignedInSelectWay extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    return (
      <StyledWaySelector>
        <div className="header">
          <h1>How would you like to participate today?</h1>
        </div>

        <div className="options">
          {this.props?.study?.settings?.guestParticipation && (
            <div className="option borderRight">
              <h2>Guest participant</h2>
              <p>
                Proceed directly to the study. Guests cannot save information
                for the next time.
              </p>
              <Link
                href={{
                  pathname: `/participate/details`,
                  query: { ...this.state, guest: true },
                }}
              >
                <button>Continue as guest</button>
              </Link>
            </div>
          )}

          <div className="option">
            <h2>MindHive member</h2>
            <p>Continue as a member for a faster study experience.</p>
            <Link
              href={{
                pathname: `/participate/details`,
                query: { ...this.state, guest: false },
              }}
            >
              <button>Continue as a member</button>
            </Link>
          </div>
        </div>
      </StyledWaySelector>
    );
  }
}

export default SignedInSelectWay;
