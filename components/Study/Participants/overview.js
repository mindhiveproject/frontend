import React, { Component } from 'react';
import ParticipantRow from './row';
import { StyledParticipantsBoard } from './styles';

class ParticipantsOverview extends Component {
  render() {
    const { participants } = this.props;
    return (
      <div className="participants">
        <StyledParticipantsBoard>
          <div style={{ padding: '10px' }}>
            <h2>Responses</h2>
          </div>
          <div className="tableHeader">
            <div>Participant ID</div>
            <div>Email</div>
            <div>Condition</div>
          </div>
          {participants.map((participant, num) => (
            <ParticipantRow
              key={num}
              num={num}
              participant={participant}
              studyId={this.props.studyId}
              openParticipant={this.props.openParticipant}
            />
          ))}
        </StyledParticipantsBoard>
      </div>
    );
  }
}

export default ParticipantsOverview;
