import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import StudyWrapper from './StudyWrapper';
import Error from '../../ErrorMessage/index';

// get the information about the current user
class UserWrapper extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayloadError} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return <StudyWrapper user={userPayloadData} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default UserWrapper;
