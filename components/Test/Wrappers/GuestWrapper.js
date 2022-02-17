import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { GUEST_QUERY } from '../../Study/Landing/guestWrapper';
import UserWrapper from './UserWrapper';
import Error from '../../ErrorMessage/index';

// get the information about the current guest
class GuestWrapper extends Component {
  render() {
    return (
      <Query query={GUEST_QUERY} variables={{ publicId: this.props.code }}>
        {guestPayload => {
          const guestPayloadError = guestPayload.error;
          const guestPayloadLoading = guestPayload.loading;
          const guestPayloadData = guestPayload.data && guestPayload.data.guest;
          if (guestPayloadError) return <Error error={guestPayloadError} />;
          if (guestPayloadLoading) return <p>Loading</p>;

          return <UserWrapper guest={guestPayloadData} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default GuestWrapper;
