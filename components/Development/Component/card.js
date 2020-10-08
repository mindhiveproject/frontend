import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import styled from 'styled-components';
import ExperimentPreview from '../../Task/Preview/index';

export const StyledBank = styled.div`
  display: grid;
`;

export const StyledTaskCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  text-align: left;
  border-top-color: ${props =>
    props.taskType === 'TASK' ? '#64c9e2' : '#28619e'};
  img {
    width: 100%;
    height: 166px;
    object-fit: cover;
  }
  .cardInfo {
    padding: 16px;
  }
  a {
    letter-spacing: 0.04em;
    text-decoration-line: underline;
    color: #007c70;
    cursor: pointer;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    color: #1a1a1a;
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
    margin-top: 24px;
    display: grid;
    align-self: end;
    align-items: center;
    justify-items: start;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    button {
      padding: 10px 25px 10px 25px;
      background: #ffffff;
      color: #007c70;
      max-width: 150px;
      border-radius: 4px;
      cursor: pointer;
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

class TaskCard extends Component {
  state = {
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  render() {
    const { task } = this.props;

    return (
      <>
        <StyledTaskCard taskType={task.taskType}>
          {task.image && (
            <div className="taskImage">
              <img src={task.image} alt={task.title} />
            </div>
          )}
          <div className="cardInfo">
            <h2>{task.title}</h2>
            <p>{ReactHtmlParser(task.description)}</p>

            {false && (
              <Link href="/studies/[slug]" as={`/studies/${task.slug}`}>
                <a>
                  <p>Create Using Task Template</p>
                </a>
              </Link>
            )}
            {this.props.onSelectTask && (
              <div className="actionLinks">
                <div>
                  <button
                    onClick={() => {
                      this.props.onSelectTask(task);
                    }}
                  >
                    <p>Select</p>
                  </button>
                </div>
                <div>
                  <a onClick={this.togglePreview}>
                    <p>Preview</p>
                  </a>
                </div>
              </div>
            )}
          </div>
        </StyledTaskCard>
        {this.state.showPreview && (
          <ExperimentPreview
            user={this.props.user.id}
            parameters={this.props.task.parameters}
            template={this.props.task.template}
            handleFinish={() => this.setState({ showPreview: false })}
          />
        )}
      </>
    );
  }
}

export default TaskCard;
