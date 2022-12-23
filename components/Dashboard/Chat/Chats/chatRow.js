import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import LeaveGroupChat from './leaveGroupChat';
import DeleteGroupChat from './deleteGroupChat';

import { StyledWrapper, StyledChatRow } from '../styles';

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
            {chat?.classes.length > 0 && (
              <div>
                <span className="title">Classes</span>
                {chat?.classes?.map((theClass, num) => (
                  <span className="item" key={num}>
                    {theClass?.title} 
                  </span>
                ))}
              </div>
            )}

            {chat?.studies.length > 0 && (
              <div>
                <span className="title">Studies</span>
                {chat?.studies?.map((study, num) => (
                  <span className="item" key={num}>
                    {study?.title}
                  </span>
                ))}
              </div>
            )}

            {chat?.members.length > 0 && (
              <div>
                <span className="title">Members</span>
                {chat?.members?.map((member, num) => (
                  <span className="item" key={num}>
                    {member?.username}
                  </span>
                ))}
              </div>
            )}
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
          {(chat?.author?.id === user?.id ||
            user?.permissions.includes('ADMIN') ||
            user?.permissions.includes('TEACHER')) && (
            <DeleteGroupChat id={chat?.id} />
          )}
        </div>
      </StyledWrapper>
    );
  }
}

export default ChatRow;
