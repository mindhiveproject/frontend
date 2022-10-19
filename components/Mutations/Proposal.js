import gql from 'graphql-tag';

export const UPDATE_PROPOSAL_BOARD = gql`
  mutation UPDATE_PROPOSAL_BOARD(
    $id: ID!
    $title: String
    $description: String
    $isSubmitted: Boolean
    $checklist: Json
    $isTemplate: Boolean
  ) {
    updateProposalBoard(
      id: $id
      title: $title
      description: $description
      isSubmitted: $isSubmitted
      checklist: $checklist
      isTemplate: $isTemplate
    ) {
      id
      title
      description
      isSubmitted
      checklist
      isTemplate
    }
  }
`;
