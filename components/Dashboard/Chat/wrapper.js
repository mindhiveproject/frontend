import React, { Component } from 'react';

import Chats from './Chats/chatsList';
import AddChat from './Chats/addChat';
import ChatPage from './Chats/chatPage';
import AddMembersToChat from './Chats/addMembers';

class ChatWrapper extends Component {
  state = {
    page: this.props.page || 'chats',
    chatId: null,
  };

  addChat = () => {
    this.setState({
      page: 'addchat',
    });
  };

  openChat = chatId => {
    this.setState({
      page: 'chatpage',
      chatId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'chats',
      chatId: null,
    });
  };

  openAddMembers = (chatId, chatTitle) => {
    this.setState({
      page: 'addmemberstochat',
      chatId,
      chatTitle,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'chats') {
      return (
        <Chats
          addChat={this.addChat}
          openChat={this.openChat}
          openAddMembers={this.openAddMembers}
          user={this.props.me}
        />
      );
    }

    if (page === 'addchat') {
      return <AddChat goBack={this.goBack} />;
    }

    if (page === 'chatpage') {
      return (
        <ChatPage
          chatId={this.state.chatId}
          goBack={this.goBack}
          me={this.props.me}
        />
      );
    }

    if (page === 'addmemberstochat') {
      return (
        <AddMembersToChat
          chatId={this.state.chatId}
          goBack={this.goBack}
          chatTitle={this.state.chatTitle}
        />
      );
    }

    return <h1>Messages</h1>;
  }
}

export default ChatWrapper;
