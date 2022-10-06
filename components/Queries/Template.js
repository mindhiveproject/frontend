import gql from 'graphql-tag';

export const OVERVIEW_TEMPLATES_QUERY = gql`
  query OVERVIEW_TEMPLATES_QUERY($skip: Int, $first: Int, $search: String) {
    templates(
      where: { OR: [{ title_contains: $search }, { slug_contains: $search }] }
      skip: $skip
      first: $first
    ) {
      id
      title
      slug
    }
  }
`;

export const PAGINATION_TEMPLATES_QUERY = gql`
  query PAGINATION_TEMPLATES_QUERY($search: String) {
    countTemplates(where: { title_contains: $search }) {
      aggregate {
        count
      }
    }
  }
`;

export const TEMPLATE_QUERY = gql`
  query TEMPLATE_QUERY($id: ID!) {
    template(where: { id: $id }) {
      id
      title
      shortDescription
      description
      author {
        id
        username
      }
      parameters
      script
      style
      settings
      tasks {
        id
      }
      tasks {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;
