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
  .header {
    padding: 25px 20px 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    align-items: center;
    .firstLine {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 1fr auto;
    }
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
      max-width: 300px;
    }
    .closeBtn {
      line-height: 3rem;
      text-align: center;
      cursor: pointer;
      border-radius: 2.25rem;
      color: #5f6871;
      font-size: 2rem;
      cursor: pointer;
      :hover {
        transform: scale(1.5);
        transition: transform 0.5s;
        color: red;
      }
    }
  }
  .headerInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto;
    .secondary {
      background: white;
      color: #007c70;
    }
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
          <div className="firstLine">
            <div>
              <div onClick={() => this.props.openAssignment(assignment.id)}>
                <h2>{assignment.title}</h2>
              </div>
              <em>{moment(assignment.createdAt).format('MMM D, YYYY')}</em>
            </div>
            <DeleteAssignment assignmentId={assignment?.id} classId={classId}>
              <div className="closeBtn">
                <div onClick={this.props.goBack}>&times;</div>
              </div>
            </DeleteAssignment>
          </div>

          <div className="headerInfo">
            <button onClick={() => this.props.openAssignment(assignment.id)}>
              Homework
            </button>
            <button
              className="secondary"
              onClick={() => this.props.editAssignment(assignment.id)}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="content">{ReactHtmlParser(assignment.content)}</div>
      </StyledPost>
    );
  }
}

export default AssignmentTab;
