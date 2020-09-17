import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Error from '../../ErrorMessage/index';

import StudyUserPage from './studypage';

// import { StyledStudy } from '../styles';
// import Head from 'next/head';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const REVIEW_STUDY_QUERY = gql`
  query REVIEW_STUDY_QUERY($slug: String!) {
    study(where: { slug: $slug }) {
      id
      title
      slug
      description
      settings
      tasks {
        id
        title
        description
        link
        settings
      }
      image
      largeImage
      info
      collaborators {
        id
        username
      }
      author {
        id
      }
      consent {
        id
        title
        organization
        info
        settings
        studies {
          id
          title
        }
        tasks {
          id
          title
        }
      }
    }
  }
`;

class ReviewStudyForParticipants extends Component {
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
            <Query
              query={REVIEW_STUDY_QUERY}
              variables={{ slug: this.props.slug }}
            >
              {studyPayload => {
                const studyPayloadError = studyPayload.error;
                const studyPayloadLoading = studyPayload.loading;
                const studyPayloadData =
                  studyPayload.data && studyPayload.data.study;
                if (studyPayloadError) return <Error error={error} />;
                if (studyPayloadLoading) return <p>Loading</p>;
                if (!studyPayloadData)
                  return <p>No study found for {this.props.slug}</p>;

                return (
                  <StudyUserPage
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

export default ReviewStudyForParticipants;
export { REVIEW_STUDY_QUERY };
