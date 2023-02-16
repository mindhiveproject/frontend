import gql from "graphql-tag";

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

export const MY_CLASSES_QUERY = gql`
  query MY_CLASSES_QUERY {
    myClasses {
      id
      title
      description
      creator {
        id
        username
      }
      createdAt
      students {
        id
      }
    }
  }
`;
