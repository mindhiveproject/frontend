import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_EMAIL_QUERY } from '../../User/index';

import ChatWrapper from './wrapper';

import { StyledDasboard } from '../styles';

class DashboardStatic extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_EMAIL_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading ...</p>;
          if (!data?.me) return <h2>Please sign up or log in.</h2>;

          return (
            <StyledDasboard>
              <ChatWrapper me={data?.me} />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
