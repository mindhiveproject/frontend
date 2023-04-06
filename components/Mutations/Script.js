import gql from "graphql-tag";

export const CREATE_SCRIPT = gql`
  mutation CREATE_SCRIPT(
    $title: String!
    $description: String
    $content: String
    $isPublic: Boolean
    $isTemplate: Boolean
    $isFeatured: Boolean
    $studyId: ID
  ) {
    createScript(
      title: $title
      description: $description
      content: $content
      isPublic: $isPublic
      isTemplate: $isTemplate
      isFeatured: $isFeatured
      studyId: $studyId
    ) {
      id
    }
  }
`;

export const UPDATE_SCRIPT = gql`
  mutation UPDATE_SCRIPT(
    $id: ID!
    $title: String
    $description: String
    $content: String
    $isPublic: Boolean
    $isTemplate: Boolean
    $isFeatured: Boolean
  ) {
    updateScript(
      id: $id
      title: $title
      description: $description
      content: $content
      isPublic: $isPublic
      isTemplate: $isTemplate
      isFeatured: $isFeatured
    ) {
      id
    }
  }
`;

// delete script
export const DELETE_SCRIPT = gql`
  mutation DELETE_SCRIPT($id: ID!) {
    deleteScript(id: $id) {
      message
    }
  }
`;
