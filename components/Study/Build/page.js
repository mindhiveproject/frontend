import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledBuildStudy } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';

import { REVIEW_STUDY_QUERY } from './index';

const BUILD_MY_STUDY = gql`
  mutation BUILD_MY_STUDY($id: ID!, $tasks: [ID]!) {
    buildStudy(id: $id, tasks: $tasks) {
      id
      title
      tasks {
        id
        title
      }
    }
  }
`;

class StudyBuildPage extends Component {
  state = {
    studyTasks: this.props.studyTasks,
    availableTasks: this.props.availableTasks,
  };

  addToStudy = id => {
    const studyTasks = [
      ...((this.state && this.state.studyTasks) || []),
      this.state.availableTasks.filter(task => task.id === id)[0],
    ];
    const availableTasks = this.state.availableTasks.filter(
      task => task.id !== id
    );
    this.setState({
      studyTasks,
      availableTasks,
    });
  };

  removeFromStudy = id => {
    const studyTasks = this.state.studyTasks.filter(task => task.id !== id);
    const availableTasks = [
      ...((this.state && this.state.availableTasks) || []),
      this.state.studyTasks.filter(task => task.id === id)[0],
    ];
    this.setState({
      studyTasks,
      availableTasks,
    });
  };

  saveBuild = async (e, buildStudyMutation) => {
    e.preventDefault();
    const res = await buildStudyMutation({
      variables: {
        id: this.props.id,
        tasks: this.state.studyTasks.map(task => task.id),
      },
    });
  };

  render() {
    const { study } = this.props;
    const { tasks } = study;

    return (
      <Mutation
        mutation={BUILD_MY_STUDY}
        variables={this.state}
        refetchQueries={[
          { query: REVIEW_STUDY_QUERY, variables: { id: this.props.id } },
        ]}
      >
        {(buildStudy, { loading, error }) => (
          <StyledBuildStudy>
            <Head>
              <title>mindHIVE | {study.title}</title>
            </Head>

            <div>
              <h2>{study.title}</h2>
              <p>{study.description}</p>
              <button onClick={e => this.saveBuild(e, buildStudy)}>Save</button>
            </div>

            <div>
              {this.state.availableTasks &&
                this.state.availableTasks.map(task => (
                  <div key={task.id}>
                    {task.title}
                    <button onClick={() => this.addToStudy(task.id)}>
                      Add to study
                    </button>
                  </div>
                ))}
            </div>

            <div>
              {this.state.studyTasks &&
                this.state.studyTasks.map((task, num) => (
                  <div key={num}>
                    {task.title}
                    <button onClick={() => this.removeFromStudy(task.id)}>
                      Remove from study
                    </button>
                  </div>
                ))}
            </div>
          </StyledBuildStudy>
        )}
      </Mutation>
    );
  }
}

export default StudyBuildPage;
