import React, { Component } from 'react';

import SignedInSelectWay from './SignedIn/SignedInSelectWay';

import ProvideDetails from './ProvideDetails';

import Consent from './Consent/index';

class SignedInUser extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    const { study, query } = this.props;
    const { step, guest } = query;

    return (
      <div>
        {step === 'select' && <SignedInSelectWay {...this.props} />}
        {step === 'details' && <ProvideDetails {...this.props} />}
        {step === 'consent' && guest === 'false' && <Consent {...this.props} />}
        {step === 'consent' && guest === 'true' && (
          <Consent
            {...this.props}
            user={{ generalInfo: { ...this.props.query } }}
          />
        )}
      </div>
    );
  }
}

export default SignedInUser;
