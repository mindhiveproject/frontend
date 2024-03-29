import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../Queries/User';

import DashboardDiscover from './personalized';

class PersonalDashboard extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayload.error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return (
            <DashboardDiscover user={userPayloadData} tab={this.props.tab} />
          );
        }}
      </Query>
    );
  }
}

export default PersonalDashboard;
