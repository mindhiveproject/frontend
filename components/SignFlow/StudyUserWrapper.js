import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../ErrorMessage/index';
import SignUpWrapper from './SignUpWrapper';

const STUDY_QUERY = gql`
  query STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
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
          public
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

const USER_QUERY = gql`
  query USER_QUERY {
    me {
      id
      username
      permissions
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
      }
      studentIn {
        id
        title
      }
      participantIn {
        id
        title
        slug
        tasks {
          id
          title
        }
      }
      image
      generalInfo
      tasksInfo
      studiesInfo
      consentsInfo
      consentGivenFor {
        id
      }
      authEmail {
        id
        email
      }
    }
  }
`;

class StudyUserWrapper extends Component {
  render() {
    const { query } = this.props;
    const { id, step } = query;
    return (
      <Query query={USER_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayloadError} />;
          if (userPayloadLoading) return <h2>Loading ...</h2>;

          return (
            <Query query={STUDY_QUERY} variables={{ id }}>
              {studyPayload => {
                const studyPayloadError = studyPayload.error;
                const studyPayloadLoading = studyPayload.loading;
                const studyPayloadData =
                  studyPayload.data && studyPayload.data.study;
                if (studyPayloadError)
                  return <Error error={studyPayloadError} />;
                if (studyPayloadLoading) return <h2>Loading ...</h2>;
                if (!studyPayloadData) return <h2>No study found!</h2>;
                return (
                  <SignUpWrapper
                    query={query}
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

export default StudyUserWrapper;
