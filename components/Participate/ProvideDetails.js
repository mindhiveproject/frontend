import React, { Component } from 'react';

import Guest from './Onboarding/Guest';
import Member from './Onboarding/Member';

class ProvideDetails extends Component {
  state = {
    ...this.props.query, // put everything coming from query
  };

  render() {
    const { user, study, query } = this.props;
    const { step, guest } = query;

    if (guest === 'true') {
      return <Guest {...this.props} />;
    }

    if (user) {
      return <Member {...this.props} />;
    }
    return <Guest {...this.props} />;
  }
}

export default ProvideDetails;
