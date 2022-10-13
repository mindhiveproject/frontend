import gql from 'graphql-tag';

export const CREATE_NEW_JOURNAL = gql`
  mutation CREATE_NEW_JOURNAL($title: String!, $description: String) {
    createJournal(title: $title, description: $description) {
      id
    }
  }
`;

export const DELETE_JOURNAL_MUTATION = gql`
  mutation DELETE_JOURNAL_MUTATION($id: ID!) {
    deleteJournal(id: $id) {
      id
    }
  }
`;

export const CREATE_NEW_POST = gql`
  mutation CREATE_NEW_POST($title: String, $content: String, $journal: ID!) {
    createPost(title: $title, content: $content, journal: $journal) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UPDATE_POST($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
