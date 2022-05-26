import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { ContainerOnlyForAuthorsOrCollaborators } from '../../../../Permissions/Author/index';

class Card extends Component {
  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.props.togglePreview(this.props.component);
  };

  render() {
    const { component, viewing, testId } = this.props;

    // get the author and collaborators ids
    const authIds = [
      component?.author?.id,
      ...component?.collaborators.map(c => c.id),
    ];

    return (
      <div className="card">
        <div>
          {component.image && (
            <div className="taskImage">
              <img src={component.image} alt={component.title} />
            </div>
          )}
          <div className="cardInfo">
            <div className="cardHeader">
              <div>
                <h2>{component.title}</h2>
                <p>{component.subtitle}</p>
                <p>
                  {component.taskType} ID: {testId}
                </p>
              </div>

              <div
                className="deleteBtn"
                onClick={() => {
                  const r = confirm(
                    `Are you sure you want to delete this ${component.taskType.toLowerCase()}?`
                  );
                  if (r == true) {
                    this.props.onDeleteTest(testId);
                  }
                }}
              >
                &times;
              </div>
            </div>

            <div>
              {viewing === 'before' &&
                ReactHtmlParser(component?.settings?.descriptionBefore)}
              {viewing === 'after' &&
                ReactHtmlParser(component?.settings?.descriptionAfter)}
            </div>

            <div>
              {this.props.showDeveloperInfo &&
                ReactHtmlParser(component.description)}
            </div>

            <div className="cardButtons">
              {!component.link && (
                <button onClick={this.togglePreview}>Preview</button>
              )}

              {component.link && (
                <a target="_blank" href={component.link} rel="noreferrer">
                  <button>Preview</button>
                </a>
              )}

              <ContainerOnlyForAuthorsOrCollaborators ids={authIds}>
                {this.props.openTaskEditor && (
                  <button
                    onClick={() => this.props.openTaskEditor(component.id)}
                  >
                    Open Editor
                  </button>
                )}
              </ContainerOnlyForAuthorsOrCollaborators>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
