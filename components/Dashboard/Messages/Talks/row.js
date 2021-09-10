import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledTalkRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  cursor: pointer;
`;

class TalkRow extends Component {
  render() {
    const { mytalk } = this.props;
    return (
      <div onClick={() => this.props.openTalk(mytalk.id)}>
        <StyledTalkRow>
          <div>{mytalk?.author?.publicReadableId}</div>
          <div>{mytalk?.members?.length}</div>
          <div>{moment(mytalk?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledTalkRow>
      </div>
    );
  }
}

export default TalkRow;
export { StyledTalkRow };
