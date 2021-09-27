import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';

import { USER_DASHBOARD_QUERY } from '../../User/index';

import DashboardClasses from './personalized';
import DashboardStudentClasses from '../StudentClasses/personalized';

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
          // show classes with admin functions for teachers
          if (userPayloadData?.permissions.includes('TEACHER')) {
            return <DashboardClasses user={userPayloadData} />;
          }
          // show classes for students
          return <DashboardStudentClasses user={userPayloadData} />;
        }}
      </Query>
    );
  }
}

export default PersonalDashboard;
