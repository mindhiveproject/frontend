import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';

import { USER_DASHBOARD_QUERY } from '../../Queries/User';

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
          // show classes with admin functions for teachers and mentors
          if (
            userPayloadData?.permissions.includes('TEACHER') ||
            userPayloadData?.permissions.includes('MENTOR')
          ) {
            return (
              <DashboardClasses
                {...this.props}
                page={this.props.assignmentId && 'assignment'}
                user={userPayloadData}
              />
            );
          }
          // show classes for students
          return (
            <DashboardStudentClasses
              {...this.props}
              page={this.props.assignmentId && 'assignment'}
              user={userPayloadData}
            />
          );
        }}
      </Query>
    );
  }
}

export default PersonalDashboard;
