import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import styled from 'styled-components';
import ChatRow from './chatRow';
import { StyledClassesDasboard } from '../../styles';

import { MY_TALKS_QUERY } from '../../../Queries/Talk';

const StyledChatHeader = styled.div`
  display: grid;
  margin: 1rem 0rem;
  padding: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
  cursor: pointer;
  font-weight: bold;
`;

class ChatsList extends Component {
  render() {
    return (
      <StyledClassesDasboard>
        <h1>My group chats</h1>

        <Query query={MY_TALKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { myTalks } = data;
            if (myTalks.length === 0) {
              return (
                <>
                  <h3>You haven’t created any group chats yet.</h3>
                  <p>Once you create a group chat, it will appear here.</p>
                  <div className="navigationHeader">
                    <div>
                      <button onClick={this.props.addChat}>
                        New group chat
                      </button>
                    </div>
                  </div>
                </>
              );
            }
            return (
              <>
                <div className="navigationHeader">
                  <div>
                    <button onClick={this.props.addChat}>New group chat</button>
                  </div>
                </div>
                <div>
                  <StyledChatHeader>
                    <div>Name</div>
                    <div>Classes / Studies / Members</div>
                    <div>Date created</div>
                  </StyledChatHeader>

                  {myTalks.map(chat => (
                    <ChatRow
                      chat={chat}
                      key={chat.id}
                      openChat={this.props.openChat}
                      openAddMembers={this.props.openAddMembers}
                      user={this.props.user}
                    />
                  ))}
                </div>
              </>
            );
          }}
        </Query>
      </StyledClassesDasboard>
    );
  }
}

export default ChatsList;
