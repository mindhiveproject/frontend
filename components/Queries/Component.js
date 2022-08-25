import gql from 'graphql-tag';

export const COMPONENT_QUERY = gql`
  query COMPONENT_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      subtitle
      slug
      description
      parameters
      settings
      updatedAt
      link
      template {
        id
        title
        description
        parameters
        script
        style
      }
      taskType
      isExternal
      author {
        id
      }
      collaborators {
        id
      }
    }
  }
`;

export const COMPONENT_TO_CLONE_QUERY = gql`
  query COMPONENT_TO_CLONE_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      subtitle
      slug
      description
      descriptionForParticipants
      parameters
      settings
      updatedAt
      link
      author {
        id
      }
      template {
        id
        title
        description
        parameters
        script
        style
        author {
          id
        }
        createdAt
        updatedAt
      }
      collaborators {
        id
        username
      }
      consent {
        id
        title
      }
      taskType
      public
      submitForPublishing
      isOriginal
      isExternal
      link
      image
      largeImage
    }
  }
`;

export const COMPONENTS_QUERY = gql`
  query COMPONENTS_QUERY {
    myAndAllTasks {
      id
      title
      subtitle
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      description
      descriptionForParticipants
      taskType
      parameters
      settings
      template {
        id
        title
        description
        parameters
        script
        style
      }
      link
      image
    }
  }
`;
