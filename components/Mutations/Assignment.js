import gql from "graphql-tag";

export const CREATE_NEW_ASSIGNMENT = gql`
  mutation CREATE_NEW_ASSIGNMENT(
    $title: String
    $content: String
    $settings: Json
    $classId: [ID]
    $public: Boolean
  ) {
    createAssignment(
      title: $title
      content: $content
      settings: $settings
      classId: $classId
      public: $public
    ) {
      id
    }
  }
`;

export const UPDATE_ASSIGNMENT = gql`
  mutation UPDATE_ASSIGNMENT(
    $id: ID!
    $title: String
    $content: String
    $classId: [ID]
    $public: Boolean
  ) {
    updateAssignment(
      id: $id
      title: $title
      content: $content
      classId: $classId
      public: $public
    ) {
      id
    }
  }
`;

export const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation DELETE_ASSIGNMENT_MUTATION($id: ID!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`;
