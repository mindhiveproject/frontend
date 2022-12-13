import gql from 'graphql-tag';

export const CLASS_QUERY = gql`
  query CLASS_QUERY($code: String!) {
    class(where: { code: $code }) {
      id
      title
      code
      creator {
        id
        username
      }
      settings
    }
  }
`;
