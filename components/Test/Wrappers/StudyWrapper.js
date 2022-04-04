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
          let t;
          // find task id using the version number
          if (!this.props.t) {
            const participant = this.props.guest || this.props.user;
            const participantStudyInfo =
              participant?.studiesInfo[studyPayloadData.id];
            const participantBlock = participantStudyInfo?.blockId;
            const studyBlock = studyPayloadData?.components?.blocks.filter(
              block => block?.blockId === participantBlock
            );
            const components = studyBlock[0].tests;
            t = components
              .filter(component => component.testId === this.props.v)
              .map(component => component?.id)[0];
          }
          return <TestWrapper study={studyPayloadData} t={t} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default StudyWrapper;
