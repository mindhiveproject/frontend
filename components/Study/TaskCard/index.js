import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import { StyledTaskCard } from '../../Bank/styles';

class TaskCard extends Component {
  static propTypes = {
    taskCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { task, study } = this.props;
    const taskType = task.taskType === 'SURVEY' ? 'survey' : 'task';

    const allowRetake = !study.settings?.forbidRetake;

    return (
      <StyledTaskCard taskType={task.taskType}>
        <div className="cardInfo">
          <h2>{task.title}</h2>
          <p>
            {task.settings &&
              task.settings.duration &&
              `Duration ${task.settings.duration}`}
          </p>

          {!this.props.joinedTheStudy && (
            <div>
              {task.settings &&
                ReactHtmlParser(task.settings.descriptionBefore)}
            </div>
          )}

          {this.props.joinedTheStudy && (
            <>
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

              {!this.props.completed && (
                <div className="actionLinks">
                  <button>
                    <a
                      target="_blank"
                      href={`/dt/r?t=${task.id}&s=${this.props.study.id}`}
                    >
                      <p>Take {taskType}</p>
                    </a>
                  </button>
                </div>
              )}

              {allowRetake && this.props.completed && (
                <div className="actionLinks">
                  <button>
                    <a
                      target="_blank"
                      href={`/dt/r?t=${task.id}&s=${this.props.study.id}`}
                    >
                      <p>Retake {taskType}</p>
                    </a>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </StyledTaskCard>
    );
  }
}

export default TaskCard;

// <div className="actionLinks">
//   {this.props.completed && !task.link && (
//     <a onClick={() => this.props.onStartTheTask(task.id)}>
//       <p>Retake {taskType}</p>
//     </a>
//   )}
//   {this.props.completed && task.link && (
//     <button
//       onClick={() => this.props.onStartExternalTask(task.id)}
//     >
//       <a
//         target="_blank"
//         href={`${task.link}?id=${this.props.user.id}&name=${this.props.user.username}`}
//       >
//         <p>Retake external {taskType}</p>
//       </a>
//     </button>
//   )}
//
//   {!this.props.completed && !task.link && (
//     <button onClick={() => this.props.onStartTheTask(task.id)}>
//       <p>Take {taskType}</p>
//     </button>
//   )}
//   {!this.props.completed && task.link && (
//     <button
//       onClick={() => this.props.onStartExternalTask(task.id)}
//     >
//       <a
//         target="_blank"
//         href={`${task.link}?id=${this.props.user.id}&name=${this.props.user.username}`}
//       >
//         <p>Take external {taskType}</p>
//       </a>
//     </button>
//   )}
//
//   <a
//     target="_blank"
//     href={`/dt/r?id=${task.id}&study=${this.props.study.id}&s=${this.props.study.slug}`}
//   >
//     <p>Take {taskType}</p>
//   </a>
// </div>
