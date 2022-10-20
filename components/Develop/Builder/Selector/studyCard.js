import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import uniqid from 'uniqid';

import { StyledTaskCard } from './styles';

import ExperimentPreview from '../../../Task/Preview/index';

import ManageFavoriteComponents from '../../../Favorite/ManageComponents';

import { NodesTypesContainer } from '../Diagram/components/nodes-types-container/NodesTypesContainer';
import { NodeTypeLabel } from '../Diagram/components/node-type-label/NodeTypeLabel';

import TaskModal from '../../Task/Modal';

class Card extends Component {
  state = {
    showPreview: false,
    showModal: false,
    fromModal: false,
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  togglePreview = (e, fromModal) => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
      fromModal,
    });
  };

  render() {
    const { study, number, viewing } = this.props;

    // get the author and collaborators ids
    const authIds = [study?.author?.id, ...study?.collaborators.map(c => c.id)];

    return (
      <>
        <StyledTaskCard>
          <div className="addBlock">
            <Icon
              name="plus circle"
              size="big"
              color="grey"
              link
              onClick={() => {
                this.props.addStudyTemplateToCanvas(study);
              }}
            />
          </div>

          <div className="movableCard">
            <NodesTypesContainer>
              <NodeTypeLabel
                model={{
                  type: 'study',
                  diagram: study?.diagram,
                }}
                name={study?.title}
              ></NodeTypeLabel>
            </NodesTypesContainer>
          </div>
          <div className="icons">
            {false && <ManageFavoriteComponents id={study?.id} />}

            {false && (
              <div className="icon" onClick={() => this.toggleModal()}>
                <img src="/content/icons/info-2.svg" />
              </div>
            )}

            {false && !study.link && (
              <div className="icon" onClick={e => this.togglePreview(e, false)}>
                <img src="/content/icons/Eye.svg" />
              </div>
            )}

            {false && study.link && (
              <a target="_blank" href={study.link} rel="noreferrer">
                <div className="icon">
                  <img src="/content/icons/Eye.svg" />
                </div>
              </a>
            )}
          </div>
        </StyledTaskCard>
        {this.state.showPreview && (
          <ExperimentPreview
            user={this.props?.user?.id || ''}
            parameters={study.parameters}
            template={study.template}
            handleFinish={() =>
              this.setState({
                showPreview: false,
                showModal: this.state.fromModal,
              })
            }
          />
        )}
        {this.state.showModal && (
          <TaskModal
            {...this.props}
            study={study}
            onModalClose={this.toggleModal}
            onShowPreview={this.togglePreview}
          />
        )}
      </>
    );
  }
}

export default Card;
