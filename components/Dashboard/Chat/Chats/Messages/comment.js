import React, { Component } from 'react';
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
  render() {
    const { userId, chatId, message } = this.props;
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
                    <span>{word?.author?.username} </span>
                    <span className="date">
                      | {moment(word?.createdAt).format('MMMM D, YYYY HH:MM')}
                    </span>
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

              {word.children.map((comment, num) => (
                <Comment
                  key={num}
                  userId={this.props.userId}
                  chatId={chatId}
                  message={comment}
                />
              ))}
            </StyledComment>
          );
        }}
      </Query>
    );
  }
}

export default Comment;
