import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import { StyledStudy } from '../styles';
import StudyBuildPage from './page';

const REVIEW_STUDY_QUERY = gql`
  query REVIEW_STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      description
      settings
      tasks
    }
  }
`;

class BuildStudy extends Component {
  render() {
    return (
      <Query query={REVIEW_STUDY_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.study) return <p>No study found for {this.props.id}</p>;
          const { study } = data;
          console.log('study', study);
          return <StudyBuildPage study={study} id={this.props.id} />;
        }}
      </Query>
    );
  }
}

export default BuildStudy;
export { REVIEW_STUDY_QUERY };
