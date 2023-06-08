// own render prop component
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const USER_DASHBOARD_QUERY = gql`
  query USER_DASHBOARD_QUERY {
    me {
      id
      username
      permissions
      results {
        id
        template {
          id
          title
        }
        task {
          id
          title
        }
        study {
          id
        }
        quantity
        updatedAt
        payload
      }
      studentIn {
        id
        title
      }
      participantIn {
        id
        title
        slug
        shortDescription
        description
        createdAt
        image
        tasks {
          id
          title
        }
        messages {
          id
          content
          author {
            username
          }
          info
          expireAt
          createdAt
        }
      }
      teacherIn {
        id
        title
      }
      mentorIn {
        id
        title
      }
      researcherIn {
        id
        title
        isHidden
      }
      collaboratorInStudy {
        id
        title
        isHidden
      }
      taskCreatorIn {
        id
        title
        taskType
      }
      collaboratorInTask {
        id
        title
        taskType
      }
      favoriteTasks {
        id
      }
      image
      info
      publicId
      publicReadableId
      studiesInfo
    }
  }
`;

const CURRENT_USER_STUDIES_QUERY = gql`
  query CURRENT_USER_STUDIES_QUERY {
    me {
      id
      username
      permissions
      participantIn {
        id
        title
        slug
        tasks {
          id
          title
        }
      }
      studentIn {
        id
        title
      }
      results {
        id
        task {
          id
          title
        }
      }
      image
      info
    }
  }
`;

const CURRENT_USER_RESULTS_QUERY = gql`
  query CURRENT_USER_RESULTS_QUERY {
    me {
      id
      username
      permissions
      results {
        id
        template {
          id
          title
        }
        task {
          id
          title
        }
        study {
          id
        }
        quantity
        updatedAt
        payload
        info
        testVersion
      }
      studentIn {
        id
        title
      }
      participantIn {
        id
        title
        slug
        tasks {
          id
          title
        }
      }
      image
      generalInfo
      tasksInfo
      studiesInfo
      consentsInfo
      consentGivenFor {
        id
      }
      authEmail {
        id
        email
      }
      favoriteTasks {
        id
      }
      publicId
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      username
      permissions
    }
  }
`;

const CURRENT_USER_EMAIL_QUERY = gql`
  query CURRENT_USER_EMAIL_QUERY {
    me {
      id
      username
      permissions
      authEmail {
        email
      }
      generalInfo
      isPublic
      publicReadableId
    }
  }
`;

const CURRENT_USER_ID_QUERY = gql`
  query CURRENT_USER_EMAIL_QUERY {
    me {
      id
    }
  }
`;

const USER_CLASSES_QUERY = gql`
  query USER_CLASSES_QUERY {
    me {
      id
      teacherIn {
        id
        title
        network {
          classes {
            id
            title
          }
        }
      }
      studentIn {
        id
        title
        network {
          classes {
            id
            title
          }
        }
      }
      mentorIn {
        id
        title
        network {
          classes {
            id
            title
          }
        }
      }
    }
  }
`;

// query to get all users for admin overview
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int, $first: Int, $search: String) {
    users(
      skip: $skip
      first: $first
      where: {
        OR: [
          { username_contains: $search }
          { publicReadableId_contains: $search }
          { publicId_contains: $search }
        ]
      }
    ) {
      id
      publicReadableId
      publicId
      username
      authEmail {
        email
      }
      permissions
      createdAt
    }
  }
`;

// query to get the information about user (student) for admin (teacher)
const STUDENT_QUERY = gql`
  query STUDENT_QUERY($id: ID!) {
    student(id: $id) {
      id
      publicReadableId
      publicId
      username
      permissions
      authEmail {
        email
      }
      image
      studiesInfo
      participantIn {
        id
        title
        slug
        components
      }
      researcherIn {
        title
        slug
        createdAt
      }
      collaboratorInStudy {
        title
        slug
        createdAt
      }
      reviews {
        id
        createdAt
        study {
          slug
          title
        }
        proposal {
          slug
        }
        content
        stage
      }
      authorOfHomework {
        id
        title
      }
      results {
        id
        payload
        study {
          id
        }
        testVersion
        createdAt
      }
    }
  }
`;

const User = (props) => (
  <Query {...props} query={CURRENT_USER_RESULTS_QUERY}>
    {(payload) => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export {
  CURRENT_USER_QUERY,
  CURRENT_USER_RESULTS_QUERY,
  CURRENT_USER_STUDIES_QUERY,
  USER_DASHBOARD_QUERY,
  CURRENT_USER_EMAIL_QUERY,
  CURRENT_USER_ID_QUERY,
  USER_CLASSES_QUERY,
  ALL_USERS_QUERY,
  STUDENT_QUERY,
};
