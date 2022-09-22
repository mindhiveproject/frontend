import gql from 'graphql-tag';

export const CREATE_UPDATE = gql`
  mutation CREATE_UPDATE(
    $forUsers: [ID]!
    $updateArea: String
    $link: String
    $content: Json
  ) {
    createUpdate(
      forUsers: $forUsers
      updateArea: $updateArea
      link: $link
      content: $content
    ) {
      message
    }
  }
`;

export const OPEN_UPDATE = gql`
  mutation OPEN_UPDATE($id: ID!, $hasOpen: Boolean!) {
    openUpdate(id: $id, hasOpen: $hasOpen) {
      message
    }
  }
`;

export const DELETE_UPDATE = gql`
  mutation DELETE_UPDATE($id: ID!) {
    deleteUpdate(id: $id) {
      message
    }
  }
`;
