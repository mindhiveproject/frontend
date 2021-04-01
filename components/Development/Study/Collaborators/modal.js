import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import FindCollaborator from '../StudyBuilder/Edit/findCollaborator';

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

class CollaboratorsModal extends Component {
  render() {
    const {
      study,
      handleCollaboratorsChange,
      handleSetState,
      onModalClose,
    } = this.props;

    return (
      <Modal
        open={open}
        closeOnDimmerClick
        size="small"
        onClose={() => onModalClose()}
      >
        <Modal.Content>
          <Modal.Description>
            <StyledModal>
              <h2>Add collaborators</h2>
              <FindCollaborator
                study={study}
                handleCollaboratorsChange={this.props.handleCollaboratorsChange}
                handleSetState={this.props.handleSetState}
              />
            </StyledModal>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    );
  }
}

export default CollaboratorsModal;
