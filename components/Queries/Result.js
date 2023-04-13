import gql from "graphql-tag";

export const MY_STUDY_SUMMARY_RESULTS_QUERY = gql`
  query MY_STUDY_SUMMARY_RESULTS_QUERY($id: ID!) {
    summaryResults(
      where: { study: { id: $id }, fullResult: { resultType: MAIN } }
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
  query MY_STUDY_RESULTS_QUERY($id: ID!) {
    myStudyResults(where: { id: $id }) {
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
