import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_EMAIL_QUERY } from '../../Queries/User';

import SettingsDashboard from './settings';

import { StyledDasboard } from '../styles';

class DashboardStatic extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_EMAIL_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data?.me) return <p>No user found. Please sign up or login.</p>;

          return (
            <StyledDasboard>
              <SettingsDashboard me={data?.me} />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
