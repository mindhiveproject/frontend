import gql from "graphql-tag";

export const CLASS_ASSIGNMENTS = gql`
  query CLASS_ASSIGNMENTS($id: ID!) {
    assignments(where: { classes_some: { id: $id } }) {
      id
      title
      settings
      public
      homework {
        id
        public
      }
      createdAt
      updatedAt
    }
  }
`;

export const MY_ASSIGNMENTS = gql`
  query MY_ASSIGNMENTS($id: ID!) {
    assignments(where: { author: { id: $id } }) {
      id
      title
      content
      createdAt
      updatedAt
      author {
        username
      }
    }
  }
`;

export const TEMPLATE_ASSIGNMENTS = gql`
  query TEMPLATE_ASSIGNMENTS {
    assignments(where: { isTemplate: true }) {
      id
      title
      content
      createdAt
      updatedAt
      author {
        username
      }
    }
  }
`;

export const GET_ONE_ASSIGNMENT = gql`
  query GET_ONE_ASSIGNMENT($id: ID!) {
    assignment(where: { id: $id }) {
      id
      title
      content
      public
      classes {
        id
      }
    }
  }
`;
