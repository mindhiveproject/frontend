import gql from "graphql-tag";

export const CREATE_NEW_STUDY = gql`
  mutation CREATE_NEW_STUDY(
    $title: String!
    $description: String!
    $descriptionInProposalCardId: ID
    $shortDescription: String
    $settings: Json
    $info: Json
    $image: String
    $largeImage: String
    $consentId: [ID]
    $components: Json
    $submitForPublishing: Boolean
    $collaborators: [String]
    $classes: [String]
    $tags: [ID]
    $diagram: String
  ) {
    createStudy(
      title: $title
      description: $description
      descriptionInProposalCardId: $descriptionInProposalCardId
      shortDescription: $shortDescription
      settings: $settings
      info: $info
      image: $image
      largeImage: $largeImage
      consentId: $consentId
      components: $components
      submitForPublishing: $submitForPublishing
      collaborators: $collaborators
      classes: $classes
      tags: $tags
      diagram: $diagram
    ) {
      id
      slug
      title
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
      shortDescription
      settings
      info
      image
      largeImage
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
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      submitForPublishing
      classes {
        id
        title
      }
      proposal {
        id
      }
      tags {
        id
      }
      diagram
    }
  }
`;

export const UPDATE_STUDY = gql`
  mutation UPDATE_STUDY(
    $id: ID!
    $title: String
    $slug: String
    $shortDescription: String
    $description: String
    $descriptionInProposalCardId: ID
    $settings: Json
    $info: Json
    $image: String
    $largeImage: String
    $collaborators: [String]
    $consentId: [ID]
    $components: Json
    $submitForPublishing: Boolean
    $classes: [String]
    $tags: [ID]
    $diagram: String
  ) {
    updateStudy(
      id: $id
      title: $title
      slug: $slug
      description: $description
      descriptionInProposalCardId: $descriptionInProposalCardId
      shortDescription: $shortDescription
      settings: $settings
      info: $info
      image: $image
      largeImage: $largeImage
      collaborators: $collaborators
      consentId: $consentId
      components: $components
      submitForPublishing: $submitForPublishing
      classes: $classes
      tags: $tags
      diagram: $diagram
    ) {
      id
      slug
      title
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
      shortDescription
      settings
      image
      largeImage
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
      public
      submitForPublishing
      classes {
        id
        title
      }
      proposal {
        id
      }
      tags {
        id
      }
      diagram
    }
  }
`;

export const DELETE_STUDY_MUTATION = gql`
  mutation DELETE_STUDY_MUTATION($id: ID!) {
    preDeleteStudy(id: $id) {
      id
    }
  }
`;

export const CHANGE_STUDY_AUTHOR = gql`
  mutation CHANGE_STUDY_AUTHOR($id: ID!, $username: String) {
    changeStudyAuthor(id: $id, username: $username) {
      id
    }
  }
`;
