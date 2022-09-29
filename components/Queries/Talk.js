import gql from 'graphql-tag';

// query my chats
export const MY_TALKS_QUERY = gql`
  query MY_TALKS_QUERY {
    myTalks {
      id
      author {
        id
        publicReadableId
      }
      classes {
        id
        title
      }
      studies {
        id
        title
      }
      members {
        id
        username
      }
      settings
      createdAt
    }
  }
`;

// query specific chat
export const VIEW_TALK_QUERY = gql`
  query VIEW_TALK_QUERY($id: ID!) {
    talk(where: { id: $id }) {
      id
      author {
        id
        publicReadableId
      }
      classes {
        id
        title
      }
      studies {
        id
        title
      }
      members {
        id
        username
      }
      settings
      createdAt
    }
  }
`;

// query main messages of the talk
export const GET_MAIN_MESSAGES_OF_CHAT = gql`
  query GET_MAIN_MESSAGES_OF_CHAT($id: ID!) {
    words(where: { talk: { id: $id }, parent: null }) {
      id
      author {
        id
        publicReadableId
        username
      }
      message
      settings
      new
      isMain
      children {
        id
      }
      createdAt
    }
  }
`;

// query main messages of the talk
export const GET_MESSAGE = gql`
  query GET_MESSAGE($id: ID!) {
    word(where: { id: $id }) {
      id
      author {
        id
        publicReadableId
        username
      }
      message
      settings
      children {
        id
      }
      parent {
        id
      }
      createdAt
    }
  }
`;
