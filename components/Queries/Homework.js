import gql from "graphql-tag";

export const GET_ASSIGNMENT_HOMEWORKS = gql`
  query GET_ASSIGNMENT_HOMEWORKS($id: ID!) {
    homeworks(where: { assignment: { id: $id }, public: true }) {
      id
      title
      author {
        id
        username
        publicReadableId
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_HOMEWORK = gql`
  query GET_HOMEWORK($id: ID!) {
    homework(where: { id: $id }) {
      id
      title
      content
      settings
      public
      author {
        id
        username
      }
      assignment {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const MY_ASSIGNMENT_HOMEWORKS = gql`
  query MY_ASSIGNMENT_HOMEWORKS($id: ID!) {
    myHomeworks(where: { assignment: { id: $id } }) {
      id
      title
      content
      settings
      public
      createdAt
      updatedAt
    }
  }
`;
