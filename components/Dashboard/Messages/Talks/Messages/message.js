import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledMessage = styled.div`
  display: grid;
  background: white;
  margin: 5px;
  padding: 10px;

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    font-weight: bold;
  }
  .content {
    display: grid;
    margin: 1rem 0rem;
  }
`;

class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      <StyledMessage>
        <div className="header">
          <div>{message?.author?.publicReadableId}</div>
          <div>{moment(message?.createdAt).format('MMMM D, YYYY HH:MM')}</div>
        </div>
        <div className="content">{ReactHtmlParser(message?.message)}</div>
      </StyledMessage>
    );
  }
}

export default Message;
