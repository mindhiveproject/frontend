import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import StudyParticipantPage from './page';

import { StyledStudy } from '../styles';

import Page from '../../Page/index';
import RunTask from '../../Task/Run/index';

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
        description
        link
        settings
      }
      image
      largeImage
      info
      collaborators {
        id
        username
      }
      author {
        id
      }
      consent {
        id
      }
    }
  }
`;

class ReviewStudyForParticipants extends Component {
  state = {
    isTaskRunning: false,
    nextTaskId: undedined,
  };

  render() {
    return (
      <Query query={REVIEW_STUDY_QUERY} variables={{ slug: this.props.slug }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.study) return <p>No study found for {this.props.slug}</p>;
          const { study } = data;
          console.log('57 study', study);
          if (this.state.isTaskRunning) {
            return (
              <Page>
                <StudyParticipantPage
                  study={study}
                  redirect={this.props.redirect}
                />
              </Page>
            );
          }
          return (
            <RunTask
              id={study.tasks[0].id}
              policy="science"
              study={study.id}
              slug={this.props.slug}
            />
          );
        }}
      </Query>
    );
  }
}

export default ReviewStudyForParticipants;
export { REVIEW_STUDY_QUERY };
