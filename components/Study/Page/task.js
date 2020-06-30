import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
        {this.props.completed && <p>The task is already completed</p>}
        {!this.props.completed && !task.link && (
          <Link
            href={{
              pathname: `/tasks/run`,
              query: {
                id: task.id,
                policy: this.props.policy,
                study: this.props.studyId,
              },
            }}
          >
            <button>
              <a>
                <h2>Start</h2>
              </a>
            </button>
          </Link>
        )}
        {!this.props.completed && task.link && (
          <button>
            <a
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
