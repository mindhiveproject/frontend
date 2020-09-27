import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from '../styles';

class TaskCard extends Component {
  render() {
    const { task } = this.props;

    return (
      <StyledTaskCard taskType={task.taskType}>
        {task.image && (
          <div className="taskImage">
            <img src={task.image} alt={task.title} />
          </div>
        )}
        <div className="cardInfo">
          <h2>{task.title}</h2>
          <p>{ReactHtmlParser(task.description)}</p>
          <Link
            href={{
              pathname: '/task/preview',
              query: { id: task.id, r: this.props.redirect },
            }}
          >
            <a>
              <p>Preview</p>
            </a>
          </Link>
          {false && (
            <Link href="/studies/[slug]" as={`/studies/${task.slug}`}>
              <a>
                <p>Create Using Task Template</p>
              </a>
            </Link>
          )}
        </div>
      </StyledTaskCard>
    );
  }
}

export default TaskCard;
