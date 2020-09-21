import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../User/index';
import StudiesDashboard from './studies';

import { StyledDasboard } from '../styles';

class DashboardParticipate extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.me) return <p>No user found. Please sign up or login.</p>;

          return (
            <StyledDasboard>
              <StudiesDashboard
                participantStudies={data.me.participantIn}
                username={data.me.username}
              />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default DashboardParticipate;
