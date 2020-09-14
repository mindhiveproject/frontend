import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../User/index';

// import Signout from '../../Signout/index';
// import LeaveStudy from '../../Study/Leave/index';
// import UniversalBlock from './block';

import ParticipantDashboard from './participant';

import { StyledDasboard } from '../styles';

// permissions
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';

class DashboardStatic extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.me) return <p>No user found. Please sign up or login.</p>;

          return (
            <StyledDasboard>
              <ParticipantDashboard
                studies={data.me.participantIn}
                username={data.me.username}
              />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
