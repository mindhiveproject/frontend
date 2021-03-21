import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../User/index';

import HomeDashboard from './home';

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
              <HomeDashboard
                studies={data.me.participantIn}
                username={data.me.username}
                publicId={data.me.publicId}
              />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
