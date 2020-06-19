import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import StudyParticipantPage from './page';

import { StyledStudy } from '../styles';

const REVIEW_STUDY_QUERY = gql`
  query REVIEW_STUDY_QUERY($slug: String!) {
    study(where: { slug: $slug }) {
      id
      title
      slug
      description
      settings
      tasks {
        id
        title
      }
      image
      largeImage
      info
    }
  }
`;

class ReviewStudyForParticipants extends Component {
  render() {
    return (
      <Query query={REVIEW_STUDY_QUERY} variables={{ slug: this.props.slug }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.study) return <p>No study found for {this.props.slug}</p>;
          const { study } = data;
          console.log('study', study);
          return <StudyParticipantPage study={study} />;
        }}
      </Query>
    );
  }
}

export default ReviewStudyForParticipants;
export { REVIEW_STUDY_QUERY };
