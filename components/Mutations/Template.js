import gql from 'graphql-tag';

export const CREATE_TEMPLATE = gql`
  mutation CREATE_TEMPLATE(
    $title: String!
    $shortDescription: String!
    $description: String!
    $image: String
    $largeImage: String
    $parameters: Json
    $script: String
    $style: String
    $settings: Json
  ) {
    createTemplate(
      title: $title
      shortDescription: $shortDescription
      description: $description
      image: $image
      largeImage: $largeImage
      parameters: $parameters
      script: $script
      style: $style
      settings: $settings
    ) {
      id
    }
  }
`;

export const UPDATE_TEMPLATE = gql`
  mutation UPDATE_TEMPLATE(
    $id: ID!
    $title: String
    $shortDescription: String
    $description: String
    $parameters: Json
    $script: String
    $style: String
  ) {
    updateTemplate(
      id: $id
      title: $title
      shortDescription: $shortDescription
      description: $description
      parameters: $parameters
      script: $script
      style: $style
    ) {
      id
      title
      shortDescription
      description
      parameters
    }
  }
`;
