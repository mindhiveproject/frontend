import gql from 'graphql-tag';

export const MY_JOURNALS_QUERY = gql`
  query MY_JOURNALS_QUERY {
    myJournals {
      id
      title
      description
      creator {
        id
        username
      }
      createdAt
      posts {
        id
      }
    }
  }
`;

export const JOURNAL_POSTS = gql`
  query JOURNAL_POSTS($id: ID!) {
    posts(where: { journal: { id: $id } }) {
      id
      title
      content
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GET_POST($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      content
    }
  }
`;
