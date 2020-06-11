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

import { MY_TASKS_QUERY } from '../../Task/My/index';
import { REVIEW_STUDY_QUERY } from './index';

const BUILD_MY_STUDY = gql`
  mutation BUILD_MY_STUDY($id: ID!, $tasks: Json) {
    buildStudy(id: $id, tasks: $tasks) {
      id
      title
      tasks
    }
  }
`;

class StudyBuildPage extends Component {
  state = {
    tasks: this.props.study.tasks,
  };

  addToStudy = id => {
    const tasks = [...((this.state && this.state.tasks) || []), id];
    this.setState({
      tasks,
    });
  };

  removeFromStudy = num => {
    const tasks = this.state.tasks.filter((task, number) => number !== num);
    this.setState({
      tasks,
    });
  };

  saveBuild = async (e, buildStudyMutation) => {
    e.preventDefault();
    const res = await buildStudyMutation({
      variables: {
        id: this.props.id,
        ...this.state,
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

            <Query query={MY_TASKS_QUERY}>
              {({ data, error, loading }) => {
                if (loading) return <p>Loading ...</p>;
                if (error) return <p>Error: {error.message}</p>;
                return (
                  <div>
                    {data.tasks &&
                      data.tasks.map(task => (
                        <div key={task.id}>
                          {task.id} {task.title}
                          <button onClick={() => this.addToStudy(task.id)}>
                            Add to study
                          </button>
                        </div>
                      ))}
                  </div>
                );
              }}
            </Query>

            <div>
              {this.state.tasks &&
                this.state.tasks.map((task, num) => (
                  <div key={num}>
                    {task}
                    <button onClick={() => this.removeFromStudy(num)}>
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
