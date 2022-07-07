import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_EMAIL_QUERY } from '../../Queries/User';

import { StyledDasboard } from '../styles';

import AllProtocols from '../../Protocol/Board/all';

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
              <AllProtocols />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
