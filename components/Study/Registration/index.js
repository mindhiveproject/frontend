import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import RegistrationPage from './page';

import { StyledStudy } from '../styles';

const REVIEW_STUDY_QUERY = gql`
  query REVIEW_STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      slug
      title
      description
      settings
      info
      tasks {
        id
        title
        link
      }
    }
  }
`;

class RegistrationFlow extends Component {
  render() {
    return (
      <Query query={REVIEW_STUDY_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.study) return <p>No study found for {this.props.id}</p>;
          const { study } = data;
          return (
            <RegistrationPage study={study} onClose={this.props.onClose} />
          );
        }}
      </Query>
    );
  }
}

export default RegistrationFlow;
export { REVIEW_STUDY_QUERY };