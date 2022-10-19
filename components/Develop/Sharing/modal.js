import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import styled from 'styled-components';

import LinkClass from './linkClass';
import FindCollaborator from '../../Development/Study/StudyBuilder/Edit/findCollaborator';
import SaveStudy from '../Navigation/saveStudy';

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
  .collaboratorUsernamesForAdmin {
    display: grid;
    margin: 1rem 0rem 0rem 0rem;
    padding: 1rem;
    border: 1px solid pink;
    border-radius: 1rem;
    .collaboratorUsername {
      padding: 0.5rem 0rem;
    }
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

class SharingModal extends Component {
  render() {
    const { study, onModalClose, user } = this.props;

    return (
      <Modal
        open
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
                handleSetState={this.props.updateStudyState}
                user={user}
              />

              {user?.permissions.includes('ADMIN') &&
                study.collaborators.length > 0 && (
                  <div className="collaboratorUsernamesForAdmin">
                    <span>
                      <em>This information is visible only for ADMIN</em>
                    </span>
                    <h2>Collaborators</h2>
                    {study.collaborators.map((collaborator, num) => (
                      <span key={num} className="collaboratorUsername">
                        {collaborator}
                      </span>
                    ))}
                  </div>
                )}

              <h2>Add collaborators</h2>
              <FindCollaborator
                study={study}
                handleSetState={this.props.updateStudyState}
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
            >
              <button className="primary">Save & close</button>
            </SaveStudy>
          </StyledButtons>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SharingModal;
