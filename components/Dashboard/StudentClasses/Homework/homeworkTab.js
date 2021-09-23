import React, { Component } from 'react';
import styled from 'styled-components';

import DeleteHomework from './deleteHomework';

const StyledHomeworkTab = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  background: white;
  span  {
    cursor: pointer;
  }
`;

class HomeworkTab extends Component {
  render() {
    const { homework, assignmentId } = this.props;
    return (
      <StyledHomeworkTab>
        <div>{homework.title}</div>
        <span onClick={() => this.props.openHomework(homework.id)}>Edit</span>
        <DeleteHomework homeworkId={homework.id} assignmentId={assignmentId}>
          Delete
        </DeleteHomework>
      </StyledHomeworkTab>
    );
  }
}

export default HomeworkTab;
