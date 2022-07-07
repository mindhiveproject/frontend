import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../Queries/User';

import StudyContainer from './container';

const GET_STUDY = gql`
  query GET_STUDY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      slug
      description
      settings
      image
      largeImage
      info
      components
    }
  }
`;

class StudyPage extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return (
            <Query query={GET_STUDY} variables={{ id: this.props.id }}>
              {studyPayload => {
                const studyPayloadError = studyPayload.error;
                const studyPayloadLoading = studyPayload.loading;
                const studyPayloadData =
                  studyPayload.data && studyPayload.data.study;
                if (studyPayloadError) return <Error error={error} />;
                if (studyPayloadLoading) return <p>Loading</p>;
                if (!studyPayloadData) return <h1>No study found</h1>;
                return (
                  <StudyContainer
                    study={studyPayloadData}
                    user={userPayloadData}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default StudyPage;
