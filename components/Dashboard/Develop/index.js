import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../User/index';

import DashboardDiscover from './personalized';

class PersonalDashboard extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          const stats = {
            studies:
              userPayloadData?.researcherIn.length +
              userPayloadData?.collaboratorInStudy.length,
            tasks:
              userPayloadData?.taskCreatorIn.filter(
                task => task.taskType === 'TASK'
              ).length +
              userPayloadData?.collaboratorInTask.filter(
                task => task.taskType === 'TASK'
              ).length,
            surveys:
              userPayloadData?.taskCreatorIn.filter(
                task => task.taskType === 'SURVEY'
              ).length +
              userPayloadData?.collaboratorInTask.filter(
                task => task.taskType === 'SURVEY'
              ).length,
          };

          return (
            <DashboardDiscover
              user={userPayloadData}
              tab={this.props.tab}
              stats={stats}
            />
          );
        }}
      </Query>
    );
  }
}

export default PersonalDashboard;
