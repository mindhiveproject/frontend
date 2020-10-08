import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from '../styles';

class TaskCard extends Component {
  render() {
    const { component } = this.props;

    return (
      <StyledTaskCard taskType={component.taskType}>
        {component.image && (
          <div className="taskImage">
            <img src={component.image} alt={component.title} />
          </div>
        )}
        <div className="cardInfo">
          <h2>{component.title}</h2>
          <p>{ReactHtmlParser(component.description)}</p>
          {false && (
            <Link
              href={{
                pathname: '/task/preview',
                query: { id: component.id, r: this.props.redirect },
              }}
            >
              <a>
                <p>Preview</p>
              </a>
            </Link>
          )}

          {this.props.onSelectComponent && (
            <div>
              <a
                onClick={() => {
                  this.props.onSelectComponent(component);
                }}
              >
                Open Editor
              </a>
            </div>
          )}
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
