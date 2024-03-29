import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import styled from 'styled-components';

import { Modal } from 'semantic-ui-react';

import { CREATE_NEW_MESSAGE } from '../../../../Mutations/Talk';

import Note from '../../../Jodit/note';

const StyledModalWrapper = styled.div`
  display: grid;
  margin: 2rem;
`;

class CreateMessage extends Component {
  state = {
    talk: this.props.chatId,
    parent: this.props.parentMessageId,
    isMain: this.props.isMain,
    message: '',
    settings: {},
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
        mutation={CREATE_NEW_MESSAGE}
        variables={this.state}
        refetchQueries={this.props.refetchQueries}
      >
        {(createMessage, { loading, error }) => (
          <ModalExampleModal
            createMessage={createMessage}
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
      trigger={<button>{btnName}</button>}
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

export default CreateMessage;
