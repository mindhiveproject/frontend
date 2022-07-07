import gql from 'graphql-tag';

export const PUBLIC_PROFILE_QUERY = gql`
  query PUBLIC_PROFILE_QUERY($username: String!) {
    profile(where: { username: $username }) {
      id
      username
      permissions
      authEmail {
        email
      }
      studentIn {
        id
        title
      }
      participantIn {
        id
        title
        slug
        shortDescription
        description
        createdAt
        image
        tasks {
          id
          title
        }
      }
      teacherIn {
        id
        title
      }
      mentorIn {
        id
        title
      }
      researcherIn {
        id
        title
        isHidden
      }
      collaboratorInStudy {
        id
        title
        isHidden
      }
      taskCreatorIn {
        id
        title
        taskType
      }
      collaboratorInTask {
        id
        title
        taskType
      }
      image
      info
      publicId
      publicReadableId
      studiesInfo
    }
  }
`;
