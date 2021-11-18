import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import styled from 'styled-components';

const StyledTaskCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK'
      ? '#64c9e2'
      : props.taskType === 'SURVEY'
      ? '#28619e'
      : '#ffc7c3'};
  img {
    width: 100%;
    height: 166px;
    object-fit: cover;
  }
  .cardInfo {
    display: grid;
    grid-gap: 5px;
    padding: 16px;
  }
  a {
    letter-spacing: 0.04em;
    text-decoration-line: underline;
    color: #007c70;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    color: #1a1a1a;
    margin-bottom: 20px;
  }
  p {
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-align: left;
  }
  .actionLinks {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 43px;
    justify-items: baseline;
    align-items: center;
    margin-top: 24px;
    button {
      background: #ffffff;
      color: #007c70;
      width: 150px;
    }
    p {
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }
`;

class TabPreview extends Component {
  render() {
    const { task, state } = this.props;

    return (
      <div>
        <StyledTaskCard taskType={task.taskType}>
          <div className="cardInfo">
            <h2>{task.title}</h2>

            {task.settings &&
              task.settings.duration &&
              `Duration ${task.settings.duration}`}

            {state === 'before' && (
              <div>
                {task.settings &&
                  ReactHtmlParser(task.settings.descriptionBefore)}
              </div>
            )}

            {state === 'after' && (
              <div>
                {task.settings &&
                  ReactHtmlParser(task.settings.descriptionAfter)}
              </div>
            )}

            <div className="actionLinks">
              <div>
                <button onClick={() => console.log('Take')}>
                  {state === 'before' ? 'Take' : 'Retake'}{' '}
                  {task.taskType && task.taskType.toLowerCase()}
                </button>
              </div>
              {false && (
                <div>
                  <a onClick={() => console.log('Preview')}>
                    <p>Preview</p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </StyledTaskCard>
      </div>
    );
  }
}

export default TabPreview;
