import styled from 'styled-components';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import TaskCard from '../TaskCard/index';

import { COMPONENT_QUERY } from '../../Development/Study/Preview/componentPane';

const StyledTaskList = styled.div`
  display: grid;
  grid-gap: 36px;
  grid-area: tasks;
`;

class StudyTasks extends Component {
  render() {
    const { user } = this.props;
    const { study } = this.props;
    const studyIds = user?.participantIn?.map(study => study.id) || [];

    const components = study.components || [];

    const fullResultsInThisStudy =
      user?.results
        ?.filter(
          result =>
            result.study &&
            result.study.id === study.id &&
            result.payload === 'full'
        )
        .map(result => result.task.id) || [];

    return (
      <StyledTaskList>
        {components.map((task, num) => (
          <Query query={COMPONENT_QUERY} variables={{ id: task.id }} key={num}>
            {({ data, loading }) => {
              if (loading) return <p>Loading ... </p>;
              if (!data || !data.task)
                return (
                  <p>
                    No task found for the task named{' '}
                    <strong>{task.title}</strong>
                  </p>
                );
              const component = data.task;
              return (
                <TaskCard
                  key={num}
                  task={component}
                  studyId={study.id}
                  studySlug={study.slug}
                  user={user}
                  study={study}
                  completed={fullResultsInThisStudy.includes(task.id)}
                  onStartTheTask={this.props.onStartTheTask}
                  onStartExternalTask={this.props.onStartExternalTask}
                  joinedTheStudy={studyIds.includes(study.id)}
                />
              );
            }}
          </Query>
        ))}
      </StyledTaskList>
    );
  }
}

export default StudyTasks;
