import React, { Component } from 'react';
import styled from 'styled-components';

import DeleteHomework from './deleteHomework';

const StyledHomeworkTab = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr auto;
  grid-gap: 1rem;
  background: white;
  span {
    cursor: pointer;
  }
`;

class HomeworkTab extends Component {
  render() {
    const { homework, assignmentId } = this.props;
    return (
      <StyledHomeworkTab>
        <div>{homework.title}</div>
        <button
          className="secondary"
          onClick={() => this.props.openHomework(homework.id)}
        >
          Edit
        </button>
        <DeleteHomework homeworkId={homework.id} assignmentId={assignmentId}>
          <div className="closeBtn">
            <div onClick={this.props.goBack}>&times;</div>
          </div>
        </DeleteHomework>
      </StyledHomeworkTab>
    );
  }
}

export default HomeworkTab;
