import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import styled from 'styled-components';

import LinkClass from './linkClass';
import FindCollaborator from '../StudyBuilder/Edit/findCollaborator';
import SaveStudy from '../saveStudy';

const StyledModal = styled.div`
  display: grid;
  margin: 43px 51px;
  h2 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: end;
  grid-gap: 10px;
  button {
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    padding: 14px 24px;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;
    text-align: center;
  }
  .primary {
    background: #007c70;
    color: #ffffff;
    border: 2px solid #007c70;
  }
  .secondary {
    background: #ffffff;
    color: #666666;
    border: 2px solid #b3b3b3;
  }
`;

class CollaboratorsModal extends Component {
  render() {
    const { study, handleSetState, onModalClose, user } = this.props;

    console.log('study', study);

    return (
      <Modal
        open={open}
        closeOnDimmerClick={false}
        size="small"
        onClose={() => onModalClose()}
      >
        <Modal.Content>
          <Modal.Description>
            <StyledModal>
              <h2>Select the class</h2>
              <LinkClass
                study={study}
                handleSetState={this.props.handleSetState}
                user={user}
              />
              <h2>Add collaborators</h2>
              <FindCollaborator
                study={study}
                handleSetState={this.props.handleSetState}
              />
            </StyledModal>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <StyledButtons>
            <button
              className="secondary"
              onClick={() => onModalClose()}
              disabled={false}
            >
              Close without saving
            </button>

            <SaveStudy
              className="primary"
              study={this.props.study}
              isAuthor={this.props.isAuthor}
              adminMode={this.props.adminMode}
              needToClone={this.props.needToClone}
              newStudyFromScratch={this.props.newStudyFromScratch}
              createNewStudy={this.props.createNewStudy}
              updateMyStudy={this.props.updateMyStudy}
              proposalId={this.props.proposalId}
              buttonTitle="Save & close"
              callback={() => onModalClose()}
            />
          </StyledButtons>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CollaboratorsModal;
