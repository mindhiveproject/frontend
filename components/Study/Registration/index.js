import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import RegistrationPage from './page';

import { StyledStudy } from '../styles';

// const REVIEW_STUDY_QUERY = gql`
//   query REVIEW_STUDY_QUERY($id: ID!) {
//     study(where: { id: $id }) {
//       id
//       slug
//       title
//       description
//       settings
//       info
//       tasks {
//         id
//         title
//         link
//       }
//       consent {
//         id
//         title
//         studies {
//           id
//           title
//         }
//         tasks {
//           id
//           title
//         }
//       }
//     }
//   }
// `;

class RegistrationFlow extends Component {
  render() {
    return (
      <RegistrationPage
        study={this.props.study}
        user={this.props.user}
        onStartTheTask={this.props.onStartTheTask}
        onClose={this.props.onClose}
      />
    );
  }
}

export default RegistrationFlow;
// export { REVIEW_STUDY_QUERY };
