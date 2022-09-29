import gql from 'graphql-tag';

export const CREATE_NEW_TALK = gql`
  mutation CREATE_NEW_TALK(
    $members: [ID]
    $classes: [ID]
    $studies: [ID]
    $settings: Json
  ) {
    createTalk(
      members: $members
      classes: $classes
      studies: $studies
      settings: $settings
    ) {
      id
    }
  }
`;

export const CREATE_NEW_MESSAGE = gql`
  mutation CREATE_NEW_MESSAGE(
    $talk: ID!
    $message: String!
    $isMain: Boolean
    $parent: ID
    $settings: Json
  ) {
    createWord(
      talk: $talk
      message: $message
      isMain: $isMain
      parent: $parent
      settings: $settings
    ) {
      id
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UPDATE_MESSAGE($id: ID!, $message: String, $settings: Json) {
    updateWord(id: $id, message: $message, settings: $settings) {
      id
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DELETE_MESSAGE($id: ID!) {
    deleteWord(id: $id) {
      message
    }
  }
`;
