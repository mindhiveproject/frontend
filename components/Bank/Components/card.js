import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { Icon, Popup } from 'semantic-ui-react';
import { StyledTaskCard } from '../styles';
import DeleteComponent from './delete';

import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';
import { ContainerOnlyForAdmin } from '../../Permissions/Admin/index';

import PublishTaskToggle from './publish';
import ManageFavorites from './manageFavorites';

class TaskCard extends Component {
  render() {
    const {
      component,
      user,
      isFavorite,
      onSelectTask,
      developingMode,
      onSelectComponent,
    } = this.props;
    const isAuthor =
      user?.id === component?.author?.id ||
      component?.collaborators.map(c => c.id).includes(user?.id);

    return (
      <div
        onClick={e => {
          if (e.target && e.target.id === 'favoriteButton') {
            return;
          }
          if (e.target && e.target.id === 'publishButton') {
            return;
          }
          if (developingMode && onSelectComponent) {
            onSelectComponent(component);
          } else if (onSelectTask) {
            onSelectTask(component);
            window.scrollTo(0, 0);
          }
        }}
      >
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
                      <Icon
                        id="favoriteButton"
                        name="favorite"
                        color="yellow"
                      />
                    ) : (
                      <Icon id="favoriteButton" name="favorite" color="grey" />
                    )}
                  </ManageFavorites>
                )}
                {component.descriptionForParticipants && (
                  <Popup
                    content={ReactHtmlParser(
                      component.descriptionForParticipants
                    )}
                    size="huge"
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
      </div>
    );
  }
}

export default TaskCard;

// {false && this.props.onSelectComponent && (
//   <div>
//     <a
//       onClick={() => {
//         this.props.onSelectComponent(component);
//       }}
//     >
//       Open Editor
//     </a>
//   </div>
// )}
//
// {false && developingMode && isAuthor && (
//   <DeleteComponent
//     id={component.id}
//     taskType={component.taskType}
//   >
//     Delete
//   </DeleteComponent>
// )}
