import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import styled from 'styled-components';
import { StyledHomeDasboard } from '../styles';
import MessageCard from './messagecard';
import StudyParticipantCard from './StudyParticipantCard';

const StyledStudyParticipantCards = styled.div`
  display: grid;
`;

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
        <h1>Welcome{username && `, ${username}`}!</h1>
        {publicId && <div>Your participant ID is {publicId}</div>}
        <div>
          <h2>Your studies</h2>
          <StyledStudyParticipantCards>
            {studies.map((study, num) => (
              <StudyParticipantCard key={num} study={study} />
            ))}
          </StyledStudyParticipantCards>
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
