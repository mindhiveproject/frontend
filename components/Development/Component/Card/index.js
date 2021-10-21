import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { Icon, Popup } from 'semantic-ui-react';
import { StyledTaskCard } from './styles';

import ExperimentPreview from '../../../Task/Preview/index';
import { ContainerOnlyForAuthorsOrCollaborators } from '../../../Permissions/Author/index';

import ManageFavoriteComponents from '../../../Favorite/ManageComponents';

class Card extends Component {
  state = {
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  render() {
    const { component, number, viewing } = this.props;

    // get the author and collaborators ids
    const authIds = [
      component?.author?.id,
      ...component?.collaborators.map(c => c.id),
    ];

    return (
      <>
        <StyledTaskCard taskType={component.taskType}>
          {component.image && (
            <div className="taskImage">
              <img src={component.image} alt={component.title} />
            </div>
          )}
          <div className="cardInfo">
            <div className="cardHeader">
              <div>
                <h2>{component.title}</h2>
              </div>
              <div className="rightHeader">
                {component.descriptionForParticipants && (
                  <Popup
                    content={ReactHtmlParser(
                      component.descriptionForParticipants
                    )}
                    trigger={<Icon name="info circle" size="large" />}
                  />
                )}
                <ManageFavoriteComponents id={component?.id} />
                {this.props.onAddComponent && (
                  <div>
                    <button
                      onClick={() => this.props.onAddComponent(component)}
                    >
                      +
                    </button>
                  </div>
                )}
                {this.props.onRemoveComponent && (
                  <div>
                    <button
                      onClick={() =>
                        this.props.onRemoveComponent(component, number)
                      }
                    >
                      &times;
                    </button>
                  </div>
                )}
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
                <a target="_blank" href={component.link}>
                  <button>Preview</button>
                </a>
              )}

              {this.props.openTaskEditor && (
                <ContainerOnlyForAuthorsOrCollaborators ids={authIds}>
                  <button
                    onClick={() => this.props.openTaskEditor(component.id)}
                  >
                    Open Editor
                  </button>
                </ContainerOnlyForAuthorsOrCollaborators>
              )}

              {this.props.onSelectComponent && !component.link && (
                <button
                  onClick={() => {
                    this.props.onSelectComponent(component);
                  }}
                >
                  Select
                </button>
              )}

              {this.props.inStudyBuilder && (
                <Link
                  href={{
                    pathname: '/task/results',
                    query: { id: component.id },
                  }}
                >
                  <button>Task results</button>
                </Link>
              )}
            </div>
          </div>
        </StyledTaskCard>
        {this.state.showPreview && (
          <ExperimentPreview
            user={this.props?.user?.id || ''}
            parameters={component.parameters}
            template={component.template}
            handleFinish={() => this.setState({ showPreview: false })}
          />
        )}
      </>
    );
  }
}

export default Card;
