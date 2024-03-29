import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import { StyledStudy } from '../styles';
import StudyBuildPage from './page';
import { ALL_TASKS_QUERY } from '../../Task/Board/all';
import { ContainerOnlyForAuthorizedCollaborators } from '../../Permissions/Collaborator/index';

const REVIEW_STUDY_QUERY = gql`
  query REVIEW_STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      description
      settings
      tasks {
        id
        title
      }
      author {
        id
      }
      collaborators {
        id
      }
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
          const authorId = data.study.author && data.study.author.id;

          return (
            <ContainerOnlyForAuthorizedCollaborators
              ids={
                data.study.collaborators &&
                data.study.collaborators.map(c => c.id)
              }
              id={authorId}
            >
              <Query query={ALL_TASKS_QUERY}>
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading ...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  const { tasks } = data;
                  const availableTasks = tasks.filter(
                    task => !study.tasks.map(task => task.id).includes(task.id)
                  );
                  const studyTasks = tasks.filter(task =>
                    study.tasks.map(task => task.id).includes(task.id)
                  );
                  return (
                    <StudyBuildPage
                      study={study}
                      availableTasks={availableTasks}
                      studyTasks={studyTasks}
                      id={this.props.id}
                      authorId={authorId}
                    />
                  );
                }}
              </Query>
            </ContainerOnlyForAuthorizedCollaborators>
          );
        }}
      </Query>
    );
  }
}

export default BuildStudy;
export { REVIEW_STUDY_QUERY };

// return (

// );
