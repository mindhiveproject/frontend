import gql from 'graphql-tag';

// for situations with original lab.js script
export const CREATE_COMPONENT_WITH_TEMPLATE = gql`
  mutation CREATE_COMPONENT_WITH_TEMPLATE(
    $title: String!
    $subtitle: String
    $slug: String
    $description: String
    $parameters: Json
    $settings: Json
    $collaborators: [String]
    $consent: ID
    $taskType: TaskType
    $submitForPublishing: Boolean
    $template: Json
    $isOriginal: Boolean
    $image: String
    $largeImage: String
  ) {
    createTaskWithTemplate(
      title: $title
      subtitle: $subtitle
      slug: $slug
      description: $description
      parameters: $parameters
      settings: $settings
      collaborators: $collaborators
      consent: $consent
      taskType: $taskType
      submitForPublishing: $submitForPublishing
      template: $template
      isOriginal: $isOriginal
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      subtitle
      slug
      description
      parameters
      settings
      updatedAt
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
      image
      largeImage
    }
  }
`;

export const UPDATE_COMPONENT_WITH_TEMPLATE = gql`
  mutation UPDATE_COMPONENT_WITH_TEMPLATE(
    $id: ID!
    $title: String
    $subtitle: String
    $slug: String
    $description: String
    $descriptionForParticipants: String
    $parameters: Json
    $settings: Json
    $collaborators: [String]
    $consent: ID
    $taskType: TaskType
    $submitForPublishing: Boolean
    $template: Json
    $image: String
    $largeImage: String
  ) {
    updateTaskWithTemplate(
      id: $id
      title: $title
      subtitle: $subtitle
      slug: $slug
      description: $description
      descriptionForParticipants: $descriptionForParticipants
      parameters: $parameters
      settings: $settings
      collaborators: $collaborators
      consent: $consent
      taskType: $taskType
      submitForPublishing: $submitForPublishing
      template: $template
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      subtitle
      template {
        id
        title
        description
        parameters
        script
        style
        createdAt
        updatedAt
        image
        largeImage
      }
    }
  }
`;

// for situation with cloning
export const CREATE_COMPONENT = gql`
  mutation CREATE_COMPONENT(
    $title: String!
    $subtitle: String
    $slug: String
    $templateId: ID
    $description: String
    $parameters: Json
    $settings: Json
    $collaborators: [String]
    $consent: ID
    $taskType: TaskType
    $submitForPublishing: Boolean
    $link: String
    $isExternal: Boolean
    $isOriginal: Boolean
    $image: String
    $largeImage: String
  ) {
    createTask(
      title: $title
      subtitle: $subtitle
      slug: $slug
      templateId: $templateId
      description: $description
      parameters: $parameters
      settings: $settings
      collaborators: $collaborators
      consent: $consent
      taskType: $taskType
      submitForPublishing: $submitForPublishing
      link: $link
      isExternal: $isExternal
      isOriginal: $isOriginal
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      subtitle
      slug
      description
      parameters
      settings
      updatedAt
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

export const UPDATE_COMPONENT = gql`
  mutation UPDATE_COMPONENT(
    $id: ID!
    $title: String
    $subtitle: String
    $slug: String
    $description: String
    $descriptionForParticipants: String
    $parameters: Json
    $settings: Json
    $collaborators: [String]
    $consent: ID
    $taskType: TaskType
    $submitForPublishing: Boolean
    $link: String
    $image: String
    $largeImage: String
  ) {
    updateTask(
      id: $id
      title: $title
      subtitle: $subtitle
      slug: $slug
      description: $description
      descriptionForParticipants: $descriptionForParticipants
      parameters: $parameters
      settings: $settings
      collaborators: $collaborators
      consent: $consent
      taskType: $taskType
      submitForPublishing: $submitForPublishing
      link: $link
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      description
      subtitle
    }
  }
`;
