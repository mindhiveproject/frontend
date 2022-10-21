import gql from 'graphql-tag';

// mutation to update own account for user
export const EDIT_ACCOUNT_MUTATION = gql`
  mutation EDIT_ACCOUNT_MUTATION(
    $username: String
    $email: String
    $password: String
    $info: Json
    $isPublic: Boolean
  ) {
    editAccount(
      username: $username
      email: $email
      password: $password
      info: $info
      isPublic: $isPublic
    ) {
      id
    }
  }
`;

// mutation to update a user account for admin
export const UPDATE_USER_ACCOUNT = gql`
  mutation UPDATE_USER_ACCOUNT($id: ID!, $permissions: [Permission]) {
    updateUserAccount(id: $id, permissions: $permissions) {
      id
      permissions
    }
  }
`;
