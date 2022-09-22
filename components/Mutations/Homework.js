import gql from 'graphql-tag';

export const UPDATE_HOMEWORK = gql`
  mutation UPDATE_HOMEWORK(
    $id: ID!
    $content: String
    $settings: Json
    $public: Boolean
  ) {
    updateHomework(
      id: $id
      content: $content
      settings: $settings
      public: $public
    ) {
      id
    }
  }
`;
