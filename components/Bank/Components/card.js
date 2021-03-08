import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from '../styles';
import DeleteComponent from './delete';

import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';
import PublishTaskToggle from '../../Task/Customize/publish';

class TaskCard extends Component {
  render() {
    const { component, user } = this.props;
    const isAuthor =
      user?.id === component?.author?.id ||
      component?.collaborators.map(c => c.id).includes(user?.id);

    return (
      <StyledTaskCard taskType={component.taskType}>
        {component.image && (
          <div className="taskImage">
            <img src={component.image} alt={component.title} />
          </div>
        )}
        <div className="cardInfo">
          <h2>{component.title}</h2>
          {this.props.developingMode && ReactHtmlParser(component.description)}

          {this.props.participateMode && (
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

          <div className="studyLink">
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
            {this.props.developingMode && isAuthor && (
              <div
                style={{
                  display: 'grid',
                  'grid-template-columns': '1fr 70px',
                  'grid-gap': '10px',
                }}
              >
                <ContainerOnlyForScientists>
                  <PublishTaskToggle
                    id={component.id}
                    isPublic={component.public}
                  />
                </ContainerOnlyForScientists>
                <DeleteComponent
                  id={component.id}
                  taskType={component.taskType}
                >
                  Delete
                </DeleteComponent>
              </div>
            )}
          </div>
        </div>
      </StyledTaskCard>
    );
  }
}

export default TaskCard;
