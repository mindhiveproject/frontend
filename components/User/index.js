// own render prop component
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
        tasks {
          id
          title
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
      }
      collaboratorInTask {
        id
        title
      }
      image
      info
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
};
