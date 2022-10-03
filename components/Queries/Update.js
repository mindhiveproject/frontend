import gql from 'graphql-tag';

export const MY_UPDATES_QUERY = gql`
  query MY_UPDATES_QUERY {
    myUpdates(orderBy: createdAt_DESC) {
      id
      updateArea
      link
      content
      hasOpen
      createdAt
      updatedAt
    }
  }
`;
