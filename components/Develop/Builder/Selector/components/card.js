import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Icon, Popup } from 'semantic-ui-react';
import { StyledTaskCard } from './styles';

import ExperimentPreview from '../../../../Task/Preview/index';
import { ContainerOnlyForAuthorsOrCollaborators } from '../../../../Permissions/Author/index';

import ManageFavoriteComponents from '../../../../Favorite/ManageComponents';

import { NodesTypesContainer } from '../../Diagram/components/nodes-types-container/NodesTypesContainer';
import { NodeTypeLabel } from '../../Diagram/components/node-type-label/NodeTypeLabel';

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
          <div className="movableCard">
            <NodesTypesContainer>
              <NodeTypeLabel
                model={{
                  ports: 'in',
                  name: component?.title,
                  details: component?.description,
                  componentID: component.id,
                }}
                name={component?.title}
              ></NodeTypeLabel>
            </NodesTypesContainer>
          </div>
          <div className="icons">
            <ManageFavoriteComponents id={component?.id} />

            {!component.link && (
              <div className="icon" onClick={e => this.togglePreview(e)}>
                <img src="/content/icons/Eye.svg" />
              </div>
            )}

            {component.link && (
              <a target="_blank" href={component.link} rel="noreferrer">
                <div className="icon">
                  <img src="/content/icons/Eye.svg" />
                </div>
              </a>
            )}

            <div
              className="icon"
              onClick={() => this.props.openModal('task', component)}
            >
              <img src="/content/icons/info-2.svg" />
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
