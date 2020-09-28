import styled from 'styled-components';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import TaskCard from '../TaskCard/index';

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
        {study.tasks &&
          study.tasks.map((task, num) => (
            <TaskCard
              key={num}
              task={task}
              studyId={study.id}
              studySlug={study.slug}
              user={user}
              study={study}
              completed={fullResultsInThisStudy.includes(task.id)}
              onStartTheTask={this.props.onStartTheTask}
              onStartExternalTask={this.props.onStartExternalTask}
              joinedTheStudy={studyIds.includes(study.id)}
            />
          ))}
      </StyledTaskList>
    );
  }
}

export default StudyTasks;
