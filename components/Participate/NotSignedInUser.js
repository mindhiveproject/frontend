import React, { Component } from 'react';

import SelectWay from './NotSignedIn/SelectWay';
import Login from './NotSignedIn/Login';
import Signup from './NotSignedIn/Signup';

import ProvideDetails from './ProvideDetails';
import Consent from './Consent/index';

class NotSignedInUser extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    const { study, query } = this.props;
    const { step } = query;

    return (
      <div>
        {step === 'select' && <SelectWay {...this.props} />}
        {step === 'details' && <ProvideDetails {...this.props} />}
        {step === 'login' && <Login {...this.props} />}
        {step === 'signup' && <Signup {...this.props} />}
        {step === 'consent' && <Consent {...this.props} />}
      </div>
    );
  }
}

export default NotSignedInUser;
