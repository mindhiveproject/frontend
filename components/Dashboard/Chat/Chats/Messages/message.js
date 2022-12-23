import React, { Component } from 'react';
import { Accordion, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

import CreateMessage from './create';
import UpdateMessage from './update';
import DeleteMessage from './delete';

import Comment from './comment';

import { StyledMessage } from '../../styles';
import { GET_MAIN_MESSAGES_OF_CHAT } from '../../../../Queries/Talk';

class Message extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { user, chatId, message } = this.props;
    const { activeIndex } = this.state;
    const isMessageAuthor = message?.author?.id === user?.id;

    return (
      <StyledMessage>
        <div className="header">
          <div className="nameDate">
            <div>
              <div>
                <span>{message?.author?.username} </span>
                <span className="date">
                  | {moment(message?.createdAt).format('MMMM Do YYYY, h:mm a')}
                </span>
              </div>
              {message?.updatedAt !== message?.createdAt && (
                <div className="date">
                  Edited on:{' '}
                  {moment(message?.updatedAt).format('MMMM Do YYYY, h:mm a')}
                </div>
              )}
            </div>
            <div className="editLinks">
              {isMessageAuthor && (
                <UpdateMessage
                  message={message}
                  refetchQueries={[
                    {
                      query: GET_MAIN_MESSAGES_OF_CHAT,
                      variables: { id: chatId },
                    },
                  ]}
                />
              )}

              {(isMessageAuthor ||
                user?.permissions.includes('ADMIN') ||
                user?.permissions.includes('TEACHER')) && (
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
              )}
            </div>
          </div>
          <div className="title">{message?.settings?.title}</div>
        </div>
        <div className="content">{ReactHtmlParser(message?.message)}</div>

        <div className="comments">
          <div className="content">
            {message?.children?.length > 0 && (
              <Accordion fluid>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" />
                  <Label color="teal" size="large">
                    {message?.children?.length}{' '}
                    {message?.children?.length > 1 ? 'replies' : 'reply'}
                  </Label>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  {message.children.map((comment, num) => (
                    <Comment
                      key={num}
                      userId={this.props.userId}
                      chatId={chatId}
                      message={comment}
                    />
                  ))}
                </Accordion.Content>
              </Accordion>
            )}
          </div>

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
        </div>
      </StyledMessage>
    );
  }
}

export default Message;
