import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const StyledMessage = styled.div`
  display: grid;
  background: white;
  margin: 15px 5px;
  padding: 1.5rem;

  .header {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgrey;
    .title {
      font-size: 2rem;
    }
    .nameDate {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: 1fr;
      text-align: end;
      font-weight: bold;
      .date {
        font-size: 1rem;
        font-weight: 500;
        color: grey;
        font-style: italic;
      }
    }
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
          <div className="title">{message?.settings?.title}</div>
          <div className="nameDate">
            <div>{message?.author?.username}</div>
            <div className="date">
              {moment(message?.createdAt).format('MMMM D, YYYY HH:MM')}
            </div>
          </div>
        </div>
        <div className="content">{ReactHtmlParser(message?.message)}</div>
      </StyledMessage>
    );
  }
}

export default Message;
