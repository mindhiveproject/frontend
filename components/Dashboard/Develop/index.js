import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../Queries/User';

import DashboardDevelop from './personalized';

class PersonalDashboard extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayloadError} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return (
            <DashboardDevelop user={userPayloadData} tab={this.props.tab} />
          );
        }}
      </Query>
    );
  }
}

export default PersonalDashboard;
