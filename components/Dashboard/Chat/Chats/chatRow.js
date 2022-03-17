import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import LeaveGroupChat from './leaveGroupChat';
import DeleteGroupChat from './deleteGroupChat';

const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr auto;
  align-items: center;
  .controlBtns {
    display: grid;
    align-content: space-around;
    height: 100%;
  }
  .addMembersBtn {
    cursor: pointer;
  }
`;

const StyledChatRow = styled.div`
  display: grid;
  grid-gap: 2rem;
  margin: 1rem 0rem;
  padding: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
  background: white;
  cursor: pointer;
  align-items: center;
  .members {
    font-size: 1rem;
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(100px, auto));
    justify-content: start;
    .member {
      display: grid;
      background: white;
      border: 1px solid #007c70;
      width: max-content;
      padding: 0.7rem;
      border-radius: 2rem;
      justify-content: center;
      align-content: center;
    }
  }
`;

class ChatRow extends Component {
  render() {
    const { chat, user } = this.props;

    const isChatMember = chat.members
      .map(member => member.id)
      .includes(user?.id);

    return (
      <StyledWrapper>
        <StyledChatRow onClick={() => this.props.openChat(chat.id)}>
          <div>{chat?.settings?.title}</div>
          <div className="members">
            {chat?.members?.map((member, num) => (
              <div className="member" key={num}>
                {member?.username}
              </div>
            ))}
          </div>
          <div>{moment(chat?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledChatRow>
        <div className="controlBtns">
          <div
            className="addMembersBtn"
            onClick={() =>
              this.props.openAddMembers(chat?.id, chat?.settings?.title)
            }
          >
            <Icon name="user plus" />
          </div>
          {isChatMember && <LeaveGroupChat id={chat?.id} />}
          {chat?.author?.id === user?.id && <DeleteGroupChat id={chat?.id} />}
        </div>
      </StyledWrapper>
    );
  }
}

export default ChatRow;
export { StyledChatRow };
