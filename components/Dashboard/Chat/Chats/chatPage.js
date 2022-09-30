import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';

import Head from 'next/head';
import Error from '../../../ErrorMessage/index';

import Message from './Messages/message';
import CreateMessage from './Messages/create';
import EditChatTitle from './editChatTitle';

import { StyledGroupChat } from '../styles';

import {
  VIEW_TALK_QUERY,
  GET_MAIN_MESSAGES_OF_CHAT,
} from '../../../Queries/Talk';

class ChatPage extends Component {
  state = {};

  render() {
    const { chatId } = this.props;

    return (
      <StyledGroupChat>
        <div className="goBackBtn">
          <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
            ← Back
          </span>
        </div>

        <Query query={VIEW_TALK_QUERY} variables={{ id: chatId }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.talk) return <p>No messages found for {chatId}</p>;
            const { talk } = data;

            return (
              <>
                <Head>
                  <title>MindHive | {talk?.settings?.title}</title>
                </Head>
                <EditChatTitle chat={talk} />

                <div className="chatHeader">
                  <CreateMessage
                    chatId={chatId}
                    btnName="Add posting"
                    isMain
                    refetchQueries={[
                      {
                        query: GET_MAIN_MESSAGES_OF_CHAT,
                        variables: { id: chatId },
                      },
                    ]}
                  />

                  <div className="members">
                    {talk?.classes.length > 0 && (
                      <div>
                        <span className="title">Classes</span>
                        {talk?.classes?.map((theClass, num) => (
                          <span className="item" key={num}>
                            {theClass?.title} 
                          </span>
                        ))}
                      </div>
                    )}

                    {talk?.studies.length > 0 && (
                      <div>
                        <span className="title">Studies</span>
                        {talk?.studies?.map((study, num) => (
                          <span className="item" key={num}>
                            {study?.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {talk?.members.length > 0 && (
                      <div>
                        <span className="title">Members</span>
                        {talk?.members?.map((member, num) => (
                          <span className="item" key={num}>
                            {member?.username}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          }}
        </Query>

        <Query
          query={GET_MAIN_MESSAGES_OF_CHAT}
          variables={{ id: chatId }}
          pollInterval={5000}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.words) return <p>No messages found for {chatId}</p>;
            const { words } = data;

            // find out whether the user is the creator of the chat
            // const isChatAdmin = talk?.author?.id === this.props.me?.id;

            const messages = [...words].sort((a, b) =>
              a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
            );

            return (
              <div>
                {messages.map(message => (
                  <Message
                    key={message.id}
                    userId={this.props?.me?.id}
                    chatId={chatId}
                    message={message}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </StyledGroupChat>
    );
  }
}

export default ChatPage;
