import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import { StyledTaskCard, StyledCardButtonsContainer } from '../styles';

class TaskCard extends Component {
  static propTypes = {
    taskCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { task } = this.props;

    return (
      <StyledTaskCard>
        <h2>{task.title}</h2>

        <p>
          {task.settings &&
            task.settings.duration &&
            `Duration ${task.settings.duration}`}
        </p>

        <div>{ReactHtmlParser(task.description)}</div>

        <div>
          {!this.props.completed &&
            task.settings &&
            ReactHtmlParser(task.settings.descriptionBefore)}
        </div>
        <div>
          {this.props.completed &&
            task.settings &&
            ReactHtmlParser(task.settings.descriptionAfter)}
        </div>

        {this.props.completed && <p>The task is already completed</p>}
        {!this.props.completed && !task.link && (
          <>
            <button onClick={() => this.props.onStartTheTask(task.id)}>
              <a>
                <h2>Start</h2>
              </a>
            </button>
          </>
        )}
        {!this.props.completed && task.link && (
          <button onClick={() => this.props.onStartExternalTask(task.id)}>
            <a
              target="_blank"
              href={`${task.link}?id=${this.props.user.id}&name=${this.props.user.username}`}
            >
              <h2>Start</h2>
            </a>
          </button>
        )}
      </StyledTaskCard>
    );
  }
}

export default TaskCard;
