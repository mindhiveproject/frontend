import gql from "graphql-tag";

export const MY_PROPOSALS_QUERY = gql`
  query MY_PROPOSALS_QUERY($creatorId: ID!) {
    proposalBoards(where: { creator: { id: $creatorId } }) {
      id
      title
      description
      creator {
        id
        username
      }
      sections {
        id
      }
      isTemplate
      createdAt
    }
  }
`;

export const ALL_PROPOSALS_QUERY = gql`
  query ALL_PROPOSALS_QUERY {
    proposalBoards {
      id
      title
      description
      study {
        title
      }
      author {
        publicReadableId
      }
      creator {
        id
        username
      }
      sections {
        id
      }
      isTemplate
      createdAt
    }
  }
`;

export const PROPOSAL_BOARD_QUERY_LIGHT = gql`
  query PROPOSAL_BOARD_QUERY_LIGHT($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      isSubmitted
      isTemplate
      settings
    }
  }
`;

export const PROPOSAL_BOARD_QUERY = gql`
  query PROPOSAL_BOARD_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          position
          section {
            id
          }
          settings
        }
      }
      study {
        author {
          id
          username
        }
        collaborators {
          id
          username
        }
      }
      isSubmitted
      checklist
      isTemplate
      settings
    }
  }
`;

export const BOARD_QUERY = gql`
  query BOARD_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
          settings
          assignedTo {
            username
            publicReadableId
          }
        }
      }
    }
  }
`;

export const GET_CARD_TITLES_OF_PROPOSAL_QUERY_BY_ID = gql`
  query GET_CARD_TITLES_OF_PROPOSAL_QUERY_BY_ID($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      sections {
        id
        position
        cards {
          id
          title
          position
        }
      }
    }
  }
`;

export const PROPOSAL_TEMPLATES_QUERY = gql`
  query PROPOSAL_TEMPLATES_QUERY {
    proposalBoards(where: { isTemplate: true }) {
      id
      title
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
        }
      }
    }
  }
`;

export const COPY_PROPOSAL_MUTATION = gql`
  mutation COPY_PROPOSAL_MUTATION($id: ID!, $study: ID) {
    copyProposalBoard(id: $id, study: $study) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
        }
      }
    }
  }
`;

export const GET_CARD_CONTENT = gql`
  query GET_CARD_CONTENT($id: ID!) {
    proposalCard(where: { id: $id }) {
      id
      title
      description
      content
      comment
      settings
      assignedTo {
        id
        username
        publicReadableId
      }
    }
  }
`;

export const PROPOSAL_PDF_QUERY = gql`
  query PROPOSAL_PDF_QUERY($slug: String!) {
    proposalBoard(where: { slug: $slug }) {
      id
      title
      slug
      description
      study {
        id
        title
        slug
      }
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          settings
          position
          section {
            id
          }
        }
      }
    }
  }
`;

// proposal for review
export const FULL_PROPOSAL_QUERY = gql`
  query FULL_PROPOSAL_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      study {
        id
        title
        slug
      }
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          settings
          position
          section {
            id
          }
        }
      }
    }
  }
`;

// proposals of featured studies for review
export const FEATURED_PROPOSALS_FOR_REVIEW_QUERY = gql`
  query FEATURED_PROPOSALS_FOR_REVIEW_QUERY {
    proposalsFeaturedStudies {
      id
      slug
      title
      createdAt
      isSubmitted
      reviews {
        id
        stage
      }
      study {
        title
        slug
      }
      author {
        id
        studentIn {
          id
          title
        }
        teacherIn {
          id
          title
        }
      }
    }
  }
`;

// proposals of my studies for review
export const MY_PROPOSALS_FOR_REVIEW_QUERY = gql`
  query MY_PROPOSALS_FOR_REVIEW_QUERY {
    proposalsMyStudies {
      id
      slug
      title
      createdAt
      isSubmitted
      reviews {
        id
        stage
      }
      study {
        title
        slug
        classes {
          title
        }
      }
      author {
        id
        studentIn {
          id
          title
        }
        teacherIn {
          id
          title
        }
      }
    }
  }
`;

// proposals of the class for review
export const CLASS_PROPOSALS_FOR_REVIEW_QUERY = gql`
  query CLASS_PROPOSALS_FOR_REVIEW_QUERY($classes: [ID!]) {
    proposalsOfClass(where: { id_in: $classes }) {
      id
      slug
      title
      createdAt
      isSubmitted
      reviews {
        id
        stage
      }
      study {
        title
        slug
      }
      author {
        id
        studentIn {
          id
          title
        }
        teacherIn {
          id
          title
        }
      }
    }
  }
`;
