import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledTalkRow = styled.div`
  display: grid;
  grid-gap: 2rem;
  margin: 1rem 0rem;
  padding: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
  background: white;
  cursor: pointer;
  .members {
    font-size: 1.2rem;
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(100px, auto));

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

class TalkRow extends Component {
  render() {
    const { mytalk } = this.props;
    return (
      <div onClick={() => this.props.openTalk(mytalk.id)}>
        <StyledTalkRow>
          <div>{mytalk?.settings?.title}</div>
          <div className="members">
            {mytalk?.members?.map(member => (
              <div className="member">{member?.username}</div>
            ))}
          </div>
          <div>{moment(mytalk?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledTalkRow>
      </div>
    );
  }
}

export default TalkRow;
export { StyledTalkRow };
