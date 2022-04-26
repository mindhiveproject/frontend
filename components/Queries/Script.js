import gql from 'graphql-tag';

export const MY_SCRIPTS = gql`
  query MY_SCRIPTS {
    myScripts {
      id
      title
      description
      content
      isPublic
      isTemplate
      isFeatured
      createdAt
      updatedAt
    }
  }
`;

export const TEMPLATE_SCRIPTS = gql`
  query TEMPLATE_SCRIPTS {
    scripts(where: { isTemplate: true }) {
      id
      title
      description
      content
      isPublic
      isTemplate
      isFeatured
      createdAt
      updatedAt
    }
  }
`;
