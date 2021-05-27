import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import styled from 'styled-components';
import { StyledHomeDasboard } from '../styles';
import MessageCard from './messagecard';

class HomeDashboard extends Component {
  render() {
    const { me, studies, username, publicId, publicReadableId } = this.props;

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
        <h1>Welcome{username && `, ${username}`}!</h1>

        <div className="header">
          <div className="idInfo">
            <div>
              {publicId && (
                <div>
                  Participant ID <div className="code">{publicId}</div>
                </div>
              )}
            </div>

            <div>
              {publicReadableId && (
                <div>
                  Public readable ID{' '}
                  <div className="code">{publicReadableId}</div>
                </div>
              )}
            </div>
          </div>

          <div>
            Permissions
            {me?.permissions.map((permission, num) => (
              <div key={num} className="code">
                {permission}
              </div>
            ))}
          </div>
        </div>

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
