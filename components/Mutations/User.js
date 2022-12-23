import gql from 'graphql-tag';

// mutation to update own account for user
export const EDIT_ACCOUNT_MUTATION = gql`
  mutation EDIT_ACCOUNT_MUTATION(
    $username: String
    $email: String
    $password: String
    $info: Json
    $isPublic: Boolean
    $publicReadableId: String
  ) {
    editAccount(
      username: $username
      email: $email
      password: $password
      info: $info
      isPublic: $isPublic
      publicReadableId: $publicReadableId
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

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $username: String!
    $password: String!
    $user: Json
    $study: Json
    $class: Json
    $info: Json
    $permissions: [Permission]
  ) {
    signUp(
      email: $email
      username: $username
      password: $password
      user: $user
      study: $study
      class: $class
      info: $info
      permissions: $permissions
    ) {
      id
      username
      permissions
    }
  }
`;

// export const PARTICIPANT_SIGNUP_MUTATION = gql`
//   mutation PARTICIPANT_SIGNUP_MUTATION(
//     $email: String
//     $username: String!
//     $password: String!
//     $user: Json
//     $study: Json
//     $info: Json
//     $permissions: [Permission]
//   ) {
//     signUp(
//       email: $email
//       username: $username
//       password: $password
//       user: $user
//       study: $study
//       info: $info
//       permissions: $permissions
//     ) {
//       id
//       username
//       permissions
//       studiesInfo
//     }
//   }
// `;

// export const STUDENT_SIGNUP_MUTATION = gql`
//   mutation STUDENT_SIGNUP_MUTATION(
//     $email: String
//     $username: String!
//     $password: String!
//     $user: Json
//     $study: Json
//     $class: Json
//     $info: Json
//     $permissions: [Permission]
//   ) {
//     signUp(
//       email: $email
//       username: $username
//       password: $password
//       user: $user
//       study: $study
//       class: $class
//       info: $info
//       permissions: $permissions
//     ) {
//       id
//       username
//       permissions
//     }
//   }
// `;

// export const SIGNUP_MUTATION = gql`
//   mutation SIGNUP_MUTATION(
//     $email: String!
//     $username: String!
//     $password: String!
//     $permissions: [Permission]
//   ) {
//     signUp(
//       email: $email
//       username: $username
//       password: $password
//       permissions: $permissions
//     ) {
//       id
//       username
//       permissions
//     }
//   }
// `;
