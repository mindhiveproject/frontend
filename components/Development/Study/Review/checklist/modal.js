import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

function CheckModal({ onBtnClick }) {
  const [open, setOpen] = React.useState(false);

  const localOnButtonClick = params => {
    onBtnClick(params);
    if (false) {
      setOpen(false);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Open</Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => localOnButtonClick('exportProposalPDF')}
        >
          Export PDF
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => localOnButtonClick()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CheckModal;
