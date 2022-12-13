import gql from 'graphql-tag';

export const JOIN_CLASS_AS_MENTOR_MUTATION = gql`
  mutation JOIN_CLASS_AS_MENTOR_MUTATION($id: ID!, $email: String) {
    joinClassAsMentorWithProfile(id: $id, email: $email) {
      message
    }
  }
`;
