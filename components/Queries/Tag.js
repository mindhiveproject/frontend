import gql from 'graphql-tag';

export const TAGS_QUERY = gql`
  query TAGS_QUERY {
    tags {
      id
      title
      createdAt
      updatedAt
    }
  }
`;
