import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import SubmitHomework from './submitHomework';
import DeleteHomework from './deleteHomework';

const StyledHomeworkTab = styled.div`
  display: grid;
  grid-template-columns: 3fr auto;
  grid-gap: 1rem;
  background: white;
  span {
    cursor: pointer;
  }
  .rightButtons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    align-items: baseline;
  }
`;

class HomeworkTab extends Component {
  render() {
    const { homework, assignmentId } = this.props;
    return (
      <StyledHomeworkTab>
        <div>
          <div>{homework.title}</div>
          <p>
            <em>
              Last updated{' '}
              {moment(homework.updatedAt).format('MMM D, YYYY, h:mma')}
            </em>
          </p>
          <p>{homework?.public && <div>The homework was submitted</div>}</p>
        </div>
        {homework?.public ? (
          <div>
            <button
              className="secondary"
              onClick={() => this.props.openHomework(homework.id)}
            >
              Open
            </button>
          </div>
        ) : (
          <div className="rightButtons">
            <button
              className="secondary"
              onClick={() => this.props.editHomework(homework.id)}
            >
              Edit
            </button>
            <SubmitHomework
              homeworkId={homework.id}
              assignmentId={assignmentId}
            >
              <button className="secondary">Submit</button>
            </SubmitHomework>
            <DeleteHomework
              homeworkId={homework.id}
              assignmentId={assignmentId}
            >
              <button>Delete</button>
            </DeleteHomework>
          </div>
        )}
      </StyledHomeworkTab>
    );
  }
}

export default HomeworkTab;
