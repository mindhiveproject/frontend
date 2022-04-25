import gql from 'graphql-tag';

export const CREATE_SCRIPT = gql`
  mutation CREATE_SCRIPT(
    $title: String!
    $description: String
    $content: String
  ) {
    createScript(title: $title, description: $description, content: $content) {
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
  ) {
    updateScript(
      id: $id
      title: $title
      description: $description
      content: $content
    ) {
      id
    }
  }
`;
