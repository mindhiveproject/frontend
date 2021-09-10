import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Button, Modal } from 'semantic-ui-react';

import { VIEW_TALK_QUERY } from '../page';

import Note from '../../../Jodit/note';

const CREATE_NEW_MESSAGE = gql`
  mutation CREATE_NEW_MESSAGE($talk: ID!, $message: String!, $settings: Json) {
    createWord(talk: $talk, message: $message, settings: $settings) {
      id
    }
  }
`;

const StyledModalWrapper = styled.div`
  display: grid;
  margin: 2rem;
`;

class CreateMessageModal extends Component {
  state = {
    talk: this.props.talkId,
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
      <>
        <Mutation
          mutation={CREATE_NEW_MESSAGE}
          variables={this.state}
          refetchQueries={[
            { query: VIEW_TALK_QUERY, variables: { id: this.props.talkId } },
          ]}
        >
          {(createMessage, { loading, error }) => (
            <ModalExampleModal
              createMessage={createMessage}
              loading={loading}
              title={this.state?.settings?.title}
              message={this.state.message}
              handleTitleChange={this.handleTitleChange}
              handleContentChange={this.handleContentChange}
            />
          )}
        </Mutation>
      </>
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
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>New post</Button>}
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

export default CreateMessageModal;
