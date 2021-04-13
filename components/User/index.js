// own render prop component
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { graphql } from '@apollo/client/react/hoc';
import PropTypes from 'prop-types';

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
      researcherIn {
        id
        title
      }
      collaboratorInStudy {
        id
        title
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
      image
      info
      publicId
      publicReadableId
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
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_RESULTS_QUERY}>
    {payload => props.children(payload)}
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
};
