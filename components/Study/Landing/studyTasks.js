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

    // check whether there is a user and blocks, if yes, assign correct block of tasks to the user
    let components = [];
    if (
      study.components &&
      study.components.blocks &&
      study.components.blocks.length &&
      study.components.blocks[0].tests
    ) {
      if (user) {
        console.log('user', user);
        // select the blocks for the specific user
        const userStudyInfo = user.studiesInfo && user.studiesInfo[study.id];
        if (userStudyInfo) {
          const userBlock = userStudyInfo.blockId;
          console.log('user.studiesInfo', userStudyInfo, userBlock);
          console.log('study.components.blocks', study.components.blocks);
          const studyBlock = study.components.blocks.filter(
            block => block.blockId === userBlock
          );
          if (studyBlock && studyBlock.length && studyBlock[0].tests) {
            components = studyBlock[0].tests;
          }
          console.log('components', components);
        } else {
          components = study.components.blocks[0].tests;
        }
      } else {
        // if there is no user logged in, show always the tests from the first block
        components = study.components.blocks[0].tests;
      }
    } else {
      components = study.components;
    }

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
