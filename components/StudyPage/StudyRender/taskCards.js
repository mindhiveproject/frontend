import styled from "styled-components";
import React, { Component } from "react";

import TaskCard from "./taskCard";

const StyledTaskList = styled.div`
  display: grid;
  grid-gap: 36px;
  grid-area: tasks;
`;

class TaskCards extends Component {
  render() {
    const { user, study } = this.props;
    const studyIds = user?.participantIn?.map((study) => study.id) || [];

    // check whether there is a user and blocks, if yes, assign correct block of tasks to the user
    let components = [];
    if (
      study.components &&
      study.components.blocks &&
      study.components.blocks.length &&
      study.components.blocks[0].tests
    ) {
      if (user) {
        // select the blocks for the specific user
        const userStudyInfo = user.studiesInfo && user.studiesInfo[study.id];
        if (userStudyInfo) {
          const userBlock = userStudyInfo.blockId;
          if (userBlock) {
            const studyBlock = study.components.blocks.filter(
              (block) => block.blockId === userBlock
            );
            if (studyBlock && studyBlock.length && studyBlock[0].tests) {
              components = studyBlock[0].tests;
            }
          } else {
            // assign a random between-subjects block to the user in case if the user does not have any info saved
            const { blocks } = study.components;
            const randomBlock =
              blocks[Math.floor(Math.random() * blocks.length)];
            components = randomBlock.tests;
          }
        } else {
          components = study.components.blocks[0].tests;
        }
      } else {
        // if there is no user logged in, show always the tests from the first block
        components = study.components.blocks[0].tests;
      }
    } else {
      components = study.components || [];
    }

    const fullResultsInThisStudy =
      user?.results
        ?.filter(
          (result) =>
            result.study &&
            result.study.id === study.id &&
            result.payload === "full"
        )
        .map((result) => result.task.id) || [];

    return (
      <StyledTaskList>
        {components.map((component, num) => (
          <TaskCard
            key={num}
            component={component}
            completed={fullResultsInThisStudy.includes(component.id)}
            onStartTask={this.props.onStartTask}
          />
        ))}
      </StyledTaskList>
    );
  }
}

export default TaskCards;
