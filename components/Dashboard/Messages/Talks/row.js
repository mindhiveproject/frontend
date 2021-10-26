import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import LeaveGroupChat from './leaveGroupChat';

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

const StyledTalkRow = styled.div`
  display: grid;
  grid-gap: 2rem;
  margin: 1rem 0rem;
  padding: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
  background: white;
  cursor: pointer;
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

class TalkRow extends Component {
  render() {
    const { mytalk } = this.props;
    return (
      <StyledWrapper>
        <StyledTalkRow onClick={() => this.props.openTalk(mytalk.id)}>
          <div>{mytalk?.settings?.title}</div>
          <div className="members">
            {mytalk?.members?.map(member => (
              <div className="member">{member?.username}</div>
            ))}
          </div>
          <div>{moment(mytalk?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledTalkRow>
        <div className="controlBtns">
          <div
            className="addMembersBtn"
            onClick={() =>
              this.props.openAddMembers(mytalk?.id, mytalk?.settings?.title)
            }
          >
            <Icon name="user plus" />
          </div>
          <LeaveGroupChat id={mytalk?.id} />
        </div>
      </StyledWrapper>
    );
  }
}

export default TalkRow;
export { StyledTalkRow };
