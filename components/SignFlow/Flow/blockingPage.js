import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { OnboardingHeader, ResponseButtons } from '../styles';
import { Logo } from '../../Header/styles';

class BlockingPage extends Component {
  state = {
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
  };

  render() {
    const { study, user } = this.props;
    const { under18 } = this.state;
    return (
      <div>
        <OnboardingHeader>
          <Logo>
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="30" />
            </div>
          </Logo>

          {under18 && study?.settings?.minorsBlocked && (
            <div>
              We are very sorry but only participants who are 18 or older can
              take part in this study at this time.
            </div>
          )}

          <Link
            href={{
              pathname: `/studies/${study.slug}`,
            }}
          >
            <a className="closeBtn">&times;</a>
          </Link>
        </OnboardingHeader>
      </div>
    );
  }
}

export default BlockingPage;
