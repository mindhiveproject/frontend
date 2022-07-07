import gql from 'graphql-tag';

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
