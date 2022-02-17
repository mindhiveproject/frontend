import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import StudyTasks from './studyTasks';

const GUEST_QUERY = gql`
  query GUEST_QUERY($publicId: String!) {
    guest(where: { publicId: $publicId }) {
      id
      publicId
      studiesInfo
      guestParticipantIn {
        id
      }
      results {
        id
        template {
          id
          title
        }
        task {
          id
          title
        }
        study {
          id
        }
        quantity
        updatedAt
        payload
        info
        testVersion
      }
    }
  }
`;

class GuestWrapper extends Component {
  render() {
    return (
      <Query query={GUEST_QUERY} variables={{ publicId: this.props.guestCode }}>
        {guestPayload => {
          const guestPayloadError = guestPayload.error;
          const guestPayloadLoading = guestPayload.loading;
          const guestPayloadData = guestPayload.data && guestPayload.data.guest;
          console.log('guestPayloadData', guestPayloadData);

          if (guestPayloadError) return <p>Error</p>;
          if (guestPayloadLoading) return <p>Loading</p>;

          return (
            <StudyTasks
              study={this.props.study}
              user={guestPayloadData}
              onStartTheTask={this.props.onStartTheTask}
              onStartExternalTask={this.props.onStartExternalTask}
              guestCode={this.props.guestCode}
              guest
            />
          );
        }}
      </Query>
    );
  }
}

export default GuestWrapper;
export { GUEST_QUERY };
