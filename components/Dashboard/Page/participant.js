import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';
import { StyledParticipantDasboard } from '../styles';
import StudyCard from './studycard';
import MessageCard from './messagecard';

class ParticipantDashboard extends Component {
  render() {
    const { studies, username } = this.props;
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
    // console.log('6 Participant studies', studies);
    console.log('sortedMessages', sortedMessages);

    return (
      <StyledParticipantDasboard>
        <h1>Welcome back{username ? `, ${username}` : `!`}</h1>

        <div className="infoBoard">
          <div className="updatesBoard">
            <h2>Latest updates</h2>
            <div className="updates">
              {sortedMessages.map((message, num) => (
                <MessageCard key={num} message={message} />
              ))}
            </div>
          </div>

          <div className="studiesBoard">
            <h2>Your studies</h2>

            <div className="studies">
              {studies.map(study => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
          </div>
        </div>
      </StyledParticipantDasboard>
    );
  }
}

export default ParticipantDashboard;
