import gql from 'graphql-tag';

// get the information about the study using the study slug
export const STUDY_QUERY = gql`
  query STUDY_QUERY($slug: String!) {
    study(where: { slug: $slug }) {
      id
      title
      slug
      description
      settings
      tasks {
        id
        title
        description
        link
        settings
        taskType
      }
      image
      largeImage
      info
      collaborators {
        id
        username
      }
      author {
        id
      }
      consent {
        id
        title
        organization
        info
        settings
        studies {
          id
          title
          public
        }
        tasks {
          id
          title
        }
      }
      components
    }
  }
`;
