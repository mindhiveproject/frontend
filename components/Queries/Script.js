import gql from 'graphql-tag';

export const MY_SCRIPTS = gql`
  query MY_SCRIPTS {
    myScripts {
      id
      title
      description
      content
      createdAt
      updatedAt
    }
  }
`;
