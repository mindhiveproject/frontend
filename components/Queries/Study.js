import gql from 'graphql-tag';

// query used to get study information during its development
export const STUDY_DEVELOPMENT_QUERY = gql`
  query STUDY_DEVELOPMENT_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      slug
      shortDescription
      description
      descriptionInProposalCard {
        id
        title
        description
        section {
          id
          board {
            id
            title
          }
        }
      }
      settings
      image
      largeImage
      info
      author {
        id
      }
      collaborators {
        id
        username
        authEmail {
          email
          settings
        }
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
      tasks {
        id
        title
        description
      }
      proposal {
        id
        title
        createdAt
        isSubmitted
      }
      components
      public
      submitForPublishing
      classes {
        id
        title
      }
      tags {
        id
      }
      diagram
    }
  }
`;

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

// query to get all featured studies for the main public page (/index and /discover)
export const ALL_FEATURED_STUDIES_QUERY = gql`
  query ALL_FEATURED_STUDIES_QUERY {
    featuredStudies {
      id
      title
      slug
      image
      description
    }
  }
`;

// query to get all public studies for the main public page (/index and /discover)
export const ALL_PUBLIC_STUDIES_QUERY = gql`
  query ALL_PUBLIC_STUDIES_QUERY {
    studies {
      id
      title
      slug
      author {
        id
        permissions
      }
      collaborators {
        id
        permissions
      }
      public
      image
      description
      tasks {
        id
      }
    }
  }
`;

// study templates for the study builder
export const STUDY_TEMPLATES_QUERY = gql`
  query STUDY_TEMPLATES_QUERY {
    myAndPublicStudies {
      id
      title
      slug
      image
      public
      tasks {
        id
      }
      diagram
      author {
        id
      }
      collaborators {
        id
      }
    }
  }
`;

// export const ALL_PUBLIC_STUDIES_QUERY = gql`
//   query ALL_PUBLIC_STUDIES_QUERY {
//     studies {
//       id
//       title
//       slug
//       author {
//         id
//         permissions
//       }
//       collaborators {
//         id
//         permissions
//       }
//       participants {
//         id
//       }
//       guests {
//         id
//       }
//       public
//       image
//       description
//       tasks {
//         id
//       }
//       components
//     }
//   }
// `;
