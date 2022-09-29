import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import styled from 'styled-components';
import { Icon, Modal } from 'semantic-ui-react';

import { UPDATE_MESSAGE } from '../../../../Mutations/Talk';
import Note from '../../../Jodit/note';

const StyledModalWrapper = styled.div`
  display: grid;
  margin: 2rem;
`;

const StyledEditButton = styled.div`
  color: tile;
  cursor: pointer;
`;

class UpdateMessage extends Component {
  state = {
    id: this.props.message?.id,
    message: this.props.message?.message,
    settings: this.props.message?.settings || {},
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleTitleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      settings: {
        [name]: val,
      },
    });
  };

  handleContentChange = content => {
    if (content) {
      this.setState({
        message: content,
      });
    }
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_MESSAGE}
        variables={this.state}
        refetchQueries={this.props.refetchQueries}
      >
        {(updateMessage, { loading, error }) => (
          <ModalExampleModal
            createMessage={updateMessage}
            loading={loading}
            title={this.state?.settings?.title}
            message={this.state.message}
            handleTitleChange={this.handleTitleChange}
            handleContentChange={this.handleContentChange}
            btnName={this.props.btnName}
          />
        )}
      </Mutation>
    );
  }
}

function ModalExampleModal({
  createMessage,
  loading,
  title,
  message,
  handleTitleChange,
  handleContentChange,
  btnName,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <StyledEditButton>
          <Icon name="edit" />
        </StyledEditButton>
      }
    >
      <StyledModalWrapper>
        <Note
          onSubmit={async e => {
            e.preventDefault();
            await createMessage();
            setOpen(false);
          }}
          loading={loading}
          title={title}
          onTitleChange={handleTitleChange}
          content={message}
          onContentChange={handleContentChange}
          btnName="Send"
        />
      </StyledModalWrapper>
    </Modal>
  );
}

export default UpdateMessage;
