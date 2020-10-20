import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../../ErrorMessage/index';
import StudyUserPage from './studypage';
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
        taskType
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
      components
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
                // console.log('studyPayloadData', studyPayloadData);
                return (
                  <StudyUserPage
                    study={studyPayloadData}
                    user={userPayloadData}
                    onStartTask={this.props.onStartTask}
                    onEndTask={this.props.onEndTask}
                    withoutHeader={this.props.withoutHeader}
                    openedFromDashboard={this.props.openedFromDashboard}
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
