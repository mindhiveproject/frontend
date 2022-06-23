import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import styled from 'styled-components';

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
    const { component } = this.props;
    console.log({ component });

    return (
      <Modal
        open={open}
        closeOnDimmerClick
        size="large"
        onClose={() => onModalClose()}
      >
        <Modal.Content>
          <Modal.Description>
            <StyledModal>
              <h2>Header</h2>
              <p>{component?.title}</p>
            </StyledModal>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <StyledButtons>
            <button
              className="secondary"
              onClick={() => this.props.onModalClose()}
            >
              Close
            </button>
          </StyledButtons>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CollaboratorsModal;
