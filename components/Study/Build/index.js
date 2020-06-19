import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import { StyledStudy } from '../styles';
import StudyBuildPage from './page';
import { ALL_TASKS_QUERY } from '../../Task/All/index';

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

          return (
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
                console.log('study', study);
                console.log('availableTasks', availableTasks);
                console.log('studyTasks', studyTasks);
                return (
                  <StudyBuildPage
                    study={study}
                    availableTasks={availableTasks}
                    studyTasks={studyTasks}
                    id={this.props.id}
                  />
                );
              }}
            </Query>
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
