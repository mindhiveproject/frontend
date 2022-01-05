import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DeleteAssignment from './deleteAssignment';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  cursor: pointer;
`;

class AssignmentRow extends Component {
  render() {
    const { assignment } = this.props;
    return (
      <StyledRow>
        <StyledClassRow onClick={() => this.props.openAssignment(assignment)}>
          <div>{assignment?.title}</div>
          <div>{assignment?.author?.username}</div>
          <div>{moment(assignment?.createdAt).format('MMMM D, YYYY')}</div>
          <div>{moment(assignment?.updatedAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
        <div className="deleteBtn">
          <DeleteAssignment assignmentId={assignment.id}>
            Delete
          </DeleteAssignment>
        </div>
      </StyledRow>
    );
  }
}

export default AssignmentRow;
export { StyledClassRow };
