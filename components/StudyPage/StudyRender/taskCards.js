import styled from "styled-components";
import React, { Component } from "react";

import TaskCard from "./taskCard";

const StyledTaskList = styled.div`
  display: grid;
  grid-gap: 36px;
  grid-area: tasks;
`;

const StyledCondition = styled.div`
  display: grid;
  grid-gap: 20px;
  border-radius: 10px;
  background: ${(props) => (props.isMoreThanOne ? "white" : "#f7f9f8")}
  padding: ${(props) => (props.isMoreThanOne ? "20px" : "0px")}
`;

class TaskCards extends Component {
  render() {
    const { study } = this.props;
    const blocks = study?.components?.blocks || [];

    return (
      <StyledTaskList>
        {blocks.map((block, number) => (
          <StyledCondition isMoreThanOne={blocks.length > 1}>
            {blocks.length > 1 && (
              <h2>Between-subjects condition {number + 1}</h2>
            )}

            {block?.tests.map((component, num) => (
              <TaskCard
                key={num}
                component={component}
                onStartTask={this.props.onStartTask}
              />
            ))}
          </StyledCondition>
        ))}
      </StyledTaskList>
    );
  }
}

export default TaskCards;
