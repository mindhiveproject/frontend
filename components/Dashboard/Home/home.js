import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import { StyledHomeDasboard } from '../styles';
import MessageCard from './messagecard';

class HomeDashboard extends Component {
  render() {
    const { studies, username, publicId } = this.props;
    const messages = studies
      .map(study =>
        study.messages.map(message => {
          const enhancedMessage = {
            ...message,
            study: study.title,
            slug: study.slug,
          };
          return enhancedMessage;
        })
      )
      .reduce((total, amount) => total.concat(amount), []);
    const sortedMessages = sortBy(messages, [
      message => message.createdAt,
    ]).reverse();

    return (
      <StyledHomeDasboard>
        <h1>Welcome back{username ? `, ${username}` : `!`}</h1>
        <div>Your participant ID is {publicId}</div>
        <div className="updatesBoard">
          <h2>Latest updates</h2>
          <div className="updates">
            {sortedMessages.map((message, num) => (
              <MessageCard key={num} message={message} />
            ))}
          </div>
        </div>
      </StyledHomeDasboard>
    );
  }
}

export default HomeDashboard;
