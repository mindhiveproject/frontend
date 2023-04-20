import gql from "graphql-tag";

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
        file
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

export const MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY = gql`
  query MY_AND_ALL_PUBLIC_COMPONENTS_TO_CLONE_QUERY($taskType: TaskType!) {
    myAndAllTasks(where: { taskType: $taskType }) {
      id
      title
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
      taskType
      parameters
      template {
        id
        title
        description
        parameters
        script
        style
      }
      link
    }
  }
`;

export const REVIEW_TASK_QUERY_BY_ID = gql`
  query REVIEW_TASK_QUERY_BY_ID($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      description
      parameters
      template {
        id
      }
    }
  }
`;
export const REVIEW_TASK_QUERY_BY_SLUG = gql`
  query REVIEW_TASK_QUERY_BY_SLUG($slug: String!) {
    task(where: { slug: $slug }) {
      id
      title
      slug
      description
      descriptionForParticipants
      taskType
      public
      isOriginal
      isExternal
      author {
        username
      }
      collaborators {
        username
      }
      createdAt
      updatedAt
      settings
      parameters
    }
  }
`;
