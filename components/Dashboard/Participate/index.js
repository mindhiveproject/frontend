import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

import DashboardParticipate from './personalized';

class PersonalDashboard extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          console.log('userPayloadData', userPayloadData);
          // calculate stats
          const stats = {
            studies: userPayloadData?.participantIn.length,
            tasks:
              userPayloadData?.tasksInfo &&
              Object.values(userPayloadData?.tasksInfo).filter(
                task => task.taskType === 'TASK'
              ).length,
            surveys:
              userPayloadData?.tasksInfo &&
              Object.values(userPayloadData?.tasksInfo).filter(
                task => task.taskType === 'SURVEY'
              ).length,
          };

          return (
            <DashboardParticipate
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
