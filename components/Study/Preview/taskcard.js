import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import { StyledTaskCard, StyledCardButtonsContainer } from '../styles';

class TaskCard extends Component {
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

        <div>
          {task.description && (
            <div>
              <h2>Description</h2>
              {ReactHtmlParser(task.description)}
            </div>
          )}
        </div>

        <div>
          {task.settings && task.settings.descriptionBefore && (
            <div>
              <h2>Text before participation</h2>
              {ReactHtmlParser(task.settings.descriptionBefore)}
            </div>
          )}
        </div>
        <div>
          {task.settings && task.settings.descriptionAfter && (
            <div>
              <h2>Text after participation</h2>
              {ReactHtmlParser(task.settings.descriptionAfter)}
            </div>
          )}
        </div>
        <StyledCardButtonsContainer>
          <Link
            href={{
              pathname: `/task/preview`,
              query: { id: task.id },
            }}
          >
            <a>
              <h2>
                <button>Preview</button>
              </h2>
            </a>
          </Link>
        </StyledCardButtonsContainer>
      </StyledTaskCard>
    );
  }
}

export default TaskCard;
