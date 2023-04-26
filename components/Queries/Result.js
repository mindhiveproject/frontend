import gql from "graphql-tag";

export const MY_STUDY_SUMMARY_RESULTS_QUERY = gql`
  query MY_STUDY_SUMMARY_RESULTS_QUERY($studyId: ID!, $taskIds: [ID!]) {
    summaryResults(
      where: {
        study: { id: $studyId }
        task: { id_in: $taskIds }
        fullResult: { resultType: MAIN }
      }
    ) {
      id
      user {
        id
        publicId
        publicReadableId
        generalInfo
        studentIn {
          id
          code
        }
      }
      guest {
        id
        publicId
        publicReadableId
        generalInfo
      }
      study {
        id
        title
        components
      }
      task {
        id
        title
        subtitle
      }
      testVersion
      data
      createdAt
      updatedAt
    }
  }
`;

export const MY_STUDY_RESULTS_QUERY = gql`
  query MY_STUDY_RESULTS_QUERY($studyId: ID!, $taskIds: [ID!]) {
    myStudyResults(
      where: {
        study: { id: $studyId }
        task: { id_in: $taskIds }
        resultType: MAIN
      }
    ) {
      id
      study {
        id
        title
        components
      }
      task {
        id
        title
        subtitle
      }
      user {
        id
        publicId
        publicReadableId
        generalInfo
      }
      guest {
        id
        publicId
        publicReadableId
        generalInfo
      }
      quantity
      data
      createdAt
      updatedAt
      fullData {
        id
        content
      }
      incrementalData {
        id
        content
      }
      testVersion
      resultType
    }
  }
`;

export const PARTICIPANT_STUDY_RESULTS_QUERY = gql`
  query PARTICIPANT_STUDY_RESULTS_QUERY($participantId: ID!, $studyId: ID!) {
    participantStudyResults(participantId: $participantId, studyId: $studyId) {
      id
      task {
        title
      }
      quantity
      data
      dataPolicy
      token
      createdAt
      updatedAt
      payload
      study {
        title
      }
      info
      incrementalData {
        id
      }
      fullData {
        id
      }
      resultType
    }
  }
`;
