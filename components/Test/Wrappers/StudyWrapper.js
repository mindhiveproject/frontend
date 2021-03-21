import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import TestWrapper from './TestWrapper';
import Error from '../../ErrorMessage/index';

// To Do: move all queries in a separate folder
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

// get the information about the current study
class StudyWrapper extends Component {
  render() {
    return (
      <Query query={STUDY_QUERY} variables={{ id: this.props.s }}>
        {studyPayload => {
          const studyPayloadError = studyPayload.error;
          const studyPayloadLoading = studyPayload.loading;
          const studyPayloadData = studyPayload.data && studyPayload.data.study;
          if (studyPayloadError) return <Error error={studyPayloadError} />;
          if (studyPayloadLoading) return <p>Loading</p>;

          return <TestWrapper study={studyPayloadData} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default StudyWrapper;
