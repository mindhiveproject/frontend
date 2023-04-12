import gql from "graphql-tag";

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
        description
        shortDescription
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

export const ALL_PUBLIC_USERNAMES = gql`
  query ALL_PUBLIC_USERNAMES($usernames: [String]) {
    allPublicUsernames(usernames: $usernames) {
      username
      permissions
    }
  }
`;

export const STUDY_PARTICIPANTS = gql`
  query PARTICIPANTS_IN_STUDY($studyId: ID!, $search: String) {
    participantsInStudy(studyId: $studyId, search: $search) {
      id
      publicReadableId
      info
      generalInfo
      tasksInfo
      studiesInfo
      consentsInfo
    }
  }
`;
