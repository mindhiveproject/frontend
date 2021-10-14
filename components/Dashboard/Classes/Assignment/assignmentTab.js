import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import ReactHtmlParser from 'react-html-parser';
import DeleteAssignment from './deleteAssignment';

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
  max-width: 450px;
  .header {
    padding: 15px 20px 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    align-items: center;
    button {
      min-height: 56px;
      padding: 10px 24px 10px 24px;
      background: #007c70;
      border: 2px solid #007c70;
      box-sizing: border-box;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-family: 'Lato';
    }
  }
  .headerInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr auto;
  }
  .content {
    padding: 15px 20px 20px 20px;
  }
  span {
    cursor: pointer;
  }
`;

class AssignmentTab extends Component {
  render() {
    const { assignment, classId } = this.props;
    return (
      <StyledPost>
        <div className="header">
          <div onClick={() => this.props.openAssignment(assignment.id)}>
            <h2>{assignment.title}</h2>
          </div>
          <span>{moment(assignment.createdAt).format('MMM D, YYYY')}</span>
          <div className="headerInfo">
            <span onClick={() => this.props.openAssignment(assignment.id)}>
              <button>Homework</button>
            </span>
            <span onClick={() => this.props.editAssignment(assignment.id)}>
              <button>Edit</button>
            </span>
            <DeleteAssignment assignmentId={assignment?.id} classId={classId}>
              <button>Delete</button>
            </DeleteAssignment>
          </div>
        </div>

        <div className="content">{ReactHtmlParser(assignment.content)}</div>
      </StyledPost>
    );
  }
}

export default AssignmentTab;
