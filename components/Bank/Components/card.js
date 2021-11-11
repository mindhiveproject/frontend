import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { Icon, Popup } from 'semantic-ui-react';
import { StyledTaskCard } from '../styles';
import DeleteComponent from './delete';

import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';
import { ContainerOnlyForAdmin } from '../../Permissions/Admin/index';

import PublishTaskToggle from './publish';
import ManageFavorites from './manageFavorites';

class TaskCard extends Component {
  render() {
    const { component, user, isFavorite } = this.props;
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
          <div className="title">
            <div>{component.title}</div>
            <div className="rightSide">
              {user && this.props.participateMode && (
                <ManageFavorites id={component?.id} isFavorite={isFavorite}>
                  {isFavorite ? (
                    <Icon name="favorite" color="yellow" />
                  ) : (
                    <Icon name="favorite" color="grey" />
                  )}
                </ManageFavorites>
              )}
              {component.descriptionForParticipants && (
                <Popup
                  content={ReactHtmlParser(
                    component.descriptionForParticipants
                  )}
                  trigger={<Icon name="info circle" size="large" />}
                />
              )}
            </div>
          </div>

          {this.props.participateMode && (
            <Link
              href={{
                pathname: '/task/preview',
                query: { id: component.id, r: this.props.redirect },
              }}
            >
              <a>Preview</a>
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

            <div
              style={{
                display: 'grid',
                'grid-template-columns': '1fr auto',
                'grid-gap': '10px',
              }}
            >
              {this.props.overviewMode && (
                <ContainerOnlyForAdmin>
                  <PublishTaskToggle
                    id={component.id}
                    isPublic={component.public}
                  />
                </ContainerOnlyForAdmin>
              )}

              {false && this.props.developingMode && isAuthor && (
                <DeleteComponent
                  id={component.id}
                  taskType={component.taskType}
                >
                  Delete
                </DeleteComponent>
              )}
            </div>
          </div>

          {this.props.overviewMode && component?.submitForPublishing && (
            <div>
              <p>
                The {component.taskType.toLowerCase()} was submitted for
                publishing
              </p>
            </div>
          )}
        </div>
      </StyledTaskCard>
    );
  }
}

export default TaskCard;
