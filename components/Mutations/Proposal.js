import gql from "graphql-tag";

export const CREATE_NEW_PROPOSAL = gql`
  mutation CREATE_NEW_PROPOSAL(
    $title: String!
    $description: String
    $settings: Json
  ) {
    createProposalBoard(
      title: $title
      description: $description
      settings: $settings
    ) {
      id
    }
  }
`;

export const UPDATE_PROPOSAL_BOARD = gql`
  mutation UPDATE_PROPOSAL_BOARD(
    $id: ID!
    $title: String
    $description: String
    $isSubmitted: Boolean
    $checklist: Json
    $isTemplate: Boolean
    $settings: Json
  ) {
    updateProposalBoard(
      id: $id
      title: $title
      description: $description
      isSubmitted: $isSubmitted
      checklist: $checklist
      isTemplate: $isTemplate
      settings: $settings
    ) {
      id
      title
      description
      isSubmitted
      checklist
      isTemplate
      settings
    }
  }
`;

export const DELETE_PROPOSAL = gql`
  mutation DELETE_PROPOSAL($id: ID!) {
    deleteProposalBoard(id: $id) {
      message
    }
  }
`;

export const CREATE_SECTION = gql`
  mutation CREATE_SECTION(
    $boardId: ID!
    $title: String!
    $description: String
    $position: Float!
  ) {
    createProposalSection(
      boardId: $boardId
      title: $title
      description: $description
      position: $position
    ) {
      id
      title
      description
      position
    }
  }
`;

export const UPDATE_SECTION = gql`
  mutation UPDATE_SECTION(
    $id: ID!
    $boardId: ID!
    $title: String
    $description: String
    $position: Float
    $cards: [ID]
  ) {
    updateProposalSection(
      id: $id
      boardId: $boardId
      title: $title
      description: $description
      position: $position
      cards: $cards
    ) {
      id
      title
      description
      position
      cards {
        id
        title
        position
        content
      }
    }
  }
`;

export const DELETE_SECTION = gql`
  mutation DELETE_SECTION($id: ID!, $boardId: ID!) {
    deleteProposalSection(id: $id, boardId: $boardId) {
      id
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CREATE_CARD(
    $boardId: ID!
    $title: String!
    $content: String
    $sectionId: ID!
    $position: Float!
  ) {
    createProposalCard(
      boardId: $boardId
      title: $title
      content: $content
      sectionId: $sectionId
      position: $position
    ) {
      id
      title
      content
      position
      section {
        id
      }
    }
  }
`;

export const UPDATE_CARD_POSITION = gql`
  mutation UPDATE_CARD_POSITION($id: ID!, $sectionId: ID, $position: Float) {
    updateProposalCardPosition(
      id: $id
      sectionId: $sectionId
      position: $position
    ) {
      id
      position
      section {
        id
      }
    }
  }
`;

export const UPDATE_CARD_CONTENT = gql`
  mutation UPDATE_CARD_CONTENT(
    $id: ID!
    $title: String
    $description: String
    $content: String
    $comment: String
    $settings: Json
    $assignedTo: [String]
  ) {
    updateProposalCardContent(
      id: $id
      title: $title
      description: $description
      content: $content
      comment: $comment
      settings: $settings
      assignedTo: $assignedTo
    ) {
      id
      title
      description
      content
      comment
      settings
      assignedTo {
        id
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DELETE_CARD($id: ID!, $boardId: ID!) {
    deleteProposalCard(id: $id, boardId: $boardId) {
      id
      section {
        id
      }
    }
  }
`;
