import gql from 'graphql-tag';

export const PROPOSAL_REVIEWS_QUERY = gql`
  query PROPOSAL_REVIEWS_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      isSubmitted
      checklist
      reviews {
        id
        stage
        content
        author {
          id
        }
      }
    }
  }
`;
