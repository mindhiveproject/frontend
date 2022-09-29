import React, { Component } from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

import CreateMessage from './create';
import UpdateMessage from './update';
import DeleteMessage from './delete';

import Comment from './comment';

import { StyledMessage } from '../../styles';
import { GET_MAIN_MESSAGES_OF_CHAT } from '../../../../Queries/Talk';

class Message extends Component {
  render() {
    const { chatId, message } = this.props;
    const isMessageAuthor = message?.author?.id === this.props.userId;

    return (
      <StyledMessage>
        <div className="header">
          <div className="nameDate">
            <div>
              <span>{message?.author?.username} </span>
              <span className="date">
                | {moment(message?.createdAt).format('MMMM D, YYYY HH:MM')}
              </span>
            </div>
            {isMessageAuthor && (
              <div className="editLinks">
                <UpdateMessage
                  message={message}
                  refetchQueries={[
                    {
                      query: GET_MAIN_MESSAGES_OF_CHAT,
                      variables: { id: chatId },
                    },
                  ]}
                />
                <DeleteMessage
                  chatId={chatId}
                  messageId={message?.id}
                  refetchQueries={[
                    {
                      query: GET_MAIN_MESSAGES_OF_CHAT,
                      variables: { id: chatId },
                    },
                  ]}
                />
              </div>
            )}
          </div>
          <div className="title">{message?.settings?.title}</div>
        </div>
        <div className="content">{ReactHtmlParser(message?.message)}</div>
        <div className="replyBtn">
          <CreateMessage
            chatId={chatId}
            parentMessageId={message?.id}
            btnName="Reply"
            refetchQueries={[
              {
                query: GET_MAIN_MESSAGES_OF_CHAT,
                variables: { id: chatId },
              },
            ]}
          />
        </div>
        <div className="comments">
          {message.children.map((comment, num) => (
            <Comment
              key={num}
              userId={this.props.userId}
              chatId={chatId}
              message={comment}
            />
          ))}
        </div>
      </StyledMessage>
    );
  }
}

export default Message;
