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
    saved: true,
    filter: 'my',
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
      saved: false,
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
      saved: false,
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
    this.setState({
      saved: true,
    });
  };

  moveUp = (e, number) => {
    e.preventDefault();
    console.log('number', number);
    const { studyTasks } = this.state;
    if (number > 0) {
      const currentItem = studyTasks[number];
      const nextItem = studyTasks[number - 1];
      const updatedItems = [...studyTasks];
      updatedItems[number] = nextItem;
      updatedItems[number - 1] = currentItem;
      this.setState({
        studyTasks: updatedItems,
        saved: false,
      });
    }
  };

  moveDown = (e, number) => {
    e.preventDefault();
    const { studyTasks } = this.state;
    if (number < studyTasks.length - 1) {
      const currentItem = studyTasks[number];
      const nextItem = studyTasks[number + 1];
      const updatedItems = [...studyTasks];
      updatedItems[number] = nextItem;
      updatedItems[number + 1] = currentItem;
      this.setState({
        studyTasks: updatedItems,
        saved: false,
      });
    }
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

            <div className="buildHeader">
              <h1>{study.title}</h1>
              <button
                onClick={e => this.saveBuild(e, buildStudy)}
                className={this.state.saved ? 'savedBtn' : 'saveBtn'}
              >
                {loading ? 'Saving...' : this.state.saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <div className="buildBoard">
              <div>
                <h2>Choose the library of tasks</h2>

                <button
                  onClick={e => this.setState({ filter: 'my' })}
                  className={
                    this.state.filter === 'my'
                      ? 'selectedBtn'
                      : 'nonSelectedBtn'
                  }
                >
                  My tasks
                </button>
                <button
                  onClick={e => this.setState({ filter: 'all' })}
                  className={
                    this.state.filter === 'all'
                      ? 'selectedBtn'
                      : 'nonSelectedBtn'
                  }
                >
                  All tasks
                </button>

                {this.state.filter === 'my' &&
                  this.state.availableTasks &&
                  this.state.availableTasks
                    .filter(
                      task =>
                        task.author && task.author.id == this.props.authorId
                    )
                    .map(task => (
                      <div key={task.id} className="buildTaskItem">
                        <button onClick={() => this.addToStudy(task.id)}>
                          Add to study
                        </button>
                        {task.title}
                      </div>
                    ))}

                {this.state.filter === 'all' &&
                  this.state.availableTasks &&
                  this.state.availableTasks.filter(task => task) &&
                  this.state.availableTasks.map(task => (
                    <div key={task.id} className="buildTaskItem">
                      <button onClick={() => this.addToStudy(task.id)}>
                        Add to study
                      </button>
                      {task.title}
                    </div>
                  ))}
              </div>

              <div>
                <h2>The tasks of your study</h2>
                {this.state.studyTasks &&
                  this.state.studyTasks.map((task, num) => (
                    <div key={num} className="buildStudyItem">
                      <button
                        className="removeBtn"
                        onClick={() => this.removeFromStudy(task.id)}
                      >
                        &times;
                      </button>
                      {task.title}
                      <div className="moveButtons">
                        <button onClick={e => this.moveUp(e, num)}>↑</button>
                        <button onClick={e => this.moveDown(e, num)}>↓</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </StyledBuildStudy>
        )}
      </Mutation>
    );
  }
}

export default StudyBuildPage;
