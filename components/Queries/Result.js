import gql from 'graphql-tag';

export const MY_STUDY_SUMMARY_RESULTS_QUERY = gql`
  query MY_STUDY_SUMMARY_RESULTS_QUERY($id: ID!) {
    summaryResults(where: { study: { id: $id } }) {
      id
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
