import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import StudyBuilder from './builder';
import EmptyPage from '../../Page/empty';

const STUDY_QUERY = gql`
  query STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      slug
      shortDescription
      description
      settings
      image
      largeImage
      info
      author {
        id
      }
      collaborators {
        id
        username
      }
      consent {
        id
      }
      tasks {
        id
        title
        description
      }
      components
    }
  }
`;

class StudyBuilderWrapper extends Component {
  render() {
    return (
      <Query query={STUDY_QUERY} variables={{ id: this.props.studyId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.study)
            return <h1>No study found for id {this.props.studyId}</h1>;
          return (
            <EmptyPage>
              <StudyBuilder
                onLeave={this.props.onLeave}
                study={data.study}
                user={this.props.user}
              />
            </EmptyPage>
          );
        }}
      </Query>
    );
  }
}

export default StudyBuilderWrapper;
