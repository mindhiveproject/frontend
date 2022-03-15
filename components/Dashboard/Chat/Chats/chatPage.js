import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';

import Head from 'next/head';
import moment from 'moment';
import { Menu } from 'semantic-ui-react';
import Error from '../../../ErrorMessage/index';

import { StyledDasboard, StyledDevelopDasboard } from '../../styles';

import Message from './Messages/message';
import CreateMessage from './Messages/create';
import EditChatTitle from './editChatTitle';

const StyledGroupChat = styled.div`
  display: grid;
  grid-gap: 2rem;
  margin: 2rem 0rem;
  .chatHeader {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    align-items: center;
    button {
      min-height: 56px;
      padding: 10px 24px 10px 24px;
      background: #007c70;
      border: 2px solid #007c70;
      box-sizing: border-box;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-family: 'Lato';
    }
  }
  .members {
    font-size: 1.2rem;
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    justify-content: end;
    .member {
      display: grid;
      background: white;
      border: 2px solid #007c70;
      width: max-content;
      padding: 0.7rem;
      border-radius: 2rem;
      justify-content: center;
    }
  }
`;

const VIEW_TALK_QUERY = gql`
  query VIEW_TALK_QUERY($id: ID!) {
    talk(where: { id: $id }) {
      id
      author {
        id
        publicReadableId
      }
      members {
        id
        username
      }
      settings
      createdAt
      words {
        id
        author {
          publicReadableId
          username
        }
        message
        settings
        new
        createdAt
      }
    }
  }
`;

class ChatPage extends Component {
  state = {};

  render() {
    const { chatId } = this.props;

    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <div>
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
                ← Back
              </span>
            </div>
          </div>

          <Query
            query={VIEW_TALK_QUERY}
            variables={{ id: chatId }}
            pollInterval={5000}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.talk) return <p>No talk found for {chatId}</p>;
              const { talk } = data;

              // find out whether the user is the creator of the chat
              // const isChatAdmin = talk?.author?.id === this.props.me?.id;

              const messages = [...talk?.words].sort((a, b) =>
                a.createdAt > b.createdAt
                  ? -1
                  : b.createdAt > a.createdAt
                  ? 1
                  : 0
              );
              return (
                <StyledGroupChat>
                  <Head>
                    <title>MindHive | {talk?.settings?.title}</title>
                  </Head>
                  <EditChatTitle chat={talk} />

                  <div className="chatHeader">
                    <div>
                      <CreateMessage chatId={chatId} />
                    </div>
                    <div className="members">
                      {talk?.members?.map((member, num) => (
                        <div className="member" key={num}>
                          {member?.username}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {messages.map(message => (
                      <Message key={message.id} message={message} />
                    ))}
                  </div>
                </StyledGroupChat>
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default ChatPage;
export { VIEW_TALK_QUERY };
