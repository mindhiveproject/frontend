import React, { Component } from 'react';
import { Accordion, Icon, Label } from 'semantic-ui-react';
import { Query } from '@apollo/client/react/components';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import Error from '../../../../ErrorMessage/index';

import { GET_MESSAGE } from '../../../../Queries/Talk';

import CreateMessage from './create';
import UpdateMessage from './update';
import DeleteMessage from './delete';

import { StyledComment } from '../../styles';

class Comment extends Component {
  state = { activeIndex: 1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { userId, chatId, message } = this.props;
    const { activeIndex } = this.state;

    return (
      <Query query={GET_MESSAGE} variables={{ id: message?.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.word) return <p>No messages found for {chatId}</p>;
          const { word } = data;
          const isMessageAuthor = word?.author?.id === userId;

          return (
            <StyledComment>
              <div className="header">
                <div className="nameDate">
                  <div>
                    <div>
                      <span>{word?.author?.username} </span>
                      <span className="date">
                        |{' '}
                        {moment(word?.createdAt).format('MMMM Do YYYY, h:mm a')}
                      </span>
                    </div>
                    {word?.updatedAt !== word?.createdAt && (
                      <div className="date">
                        Edited on:{' '}
                        {moment(word?.updatedAt).format('MMMM Do YYYY, h:mm a')}
                      </div>
                    )}
                  </div>
                  {isMessageAuthor && (
                    <div className="editLinks">
                      <UpdateMessage
                        message={word}
                        refetchQueries={[
                          {
                            query: GET_MESSAGE,
                            variables: { id: word?.id },
                          },
                        ]}
                      />
                      <DeleteMessage
                        chatId={chatId}
                        messageId={message?.id}
                        refetchQueries={[
                          {
                            query: GET_MESSAGE,
                            variables: { id: word?.parent?.id },
                          },
                        ]}
                      />
                    </div>
                  )}
                </div>
                <div className="title">{word?.settings?.title}</div>
              </div>
              <div className="content">{ReactHtmlParser(word?.message)}</div>

              <div className="comments">
                <div className="content">
                  {word?.children?.length > 0 && (
                    <Accordion fluid>
                      <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                      >
                        <Icon name="dropdown" />
                        <Label color="teal" size="large">
                          {word?.children?.length}{' '}
                          {word?.children?.length > 1 ? 'replies' : 'reply'}
                        </Label>
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 0}>
                        {word.children.map((comment, num) => (
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
                    parentMessageId={word?.id}
                    btnName="Reply"
                    refetchQueries={[
                      {
                        query: GET_MESSAGE,
                        variables: { id: word?.id },
                      },
                    ]}
                  />
                </div>
              </div>
            </StyledComment>
          );
        }}
      </Query>
    );
  }
}

export default Comment;
