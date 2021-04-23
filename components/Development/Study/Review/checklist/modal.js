import React from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: start;
  grid-gap: 10px;
  .incomplete {
    background: #ffffff;
    border: 2px solid #b3b3b3;
  }
  .complete {
    background: #e6f2f1;
    border: 2px solid #007c70;
  }
`;

const StyledButton = styled.button`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  cursor: pointer;
  border-radius: 4px;
  align-items: center;
  padding: 14px 20px;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: center;
  color: #666666;
`;

function CheckModal({
  name,
  title,
  description,
  action,
  takeAction,
  isComplete,
  toggleCheckTo,
  updateProposalMutation,
}) {
  const [open, setOpen] = React.useState(false);

  const mark = () => {
    toggleCheckTo(name, !isComplete, updateProposalMutation);
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={
        <div className="triggerArea" style={{ cursor: 'pointer' }}>
          <strong>{title}</strong>
        </div>
      }
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{description}</Modal.Content>
      <Modal.Actions>
        <StyledButtons>
          {action && (
            <StyledButton
              className="incomplete"
              onClick={() => takeAction(action)}
            >
              <Icon name="download" />
              Export your proposal
            </StyledButton>
          )}
          <StyledButton
            className={isComplete ? 'complete' : 'incomplete'}
            onClick={() => mark()}
          >
            <Icon name="check" />
            Mark as complete
          </StyledButton>
        </StyledButtons>
      </Modal.Actions>
    </Modal>
  );
}

export default CheckModal;
