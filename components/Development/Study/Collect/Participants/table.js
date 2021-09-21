import React, { Component } from 'react';
import ParticipantRow from './row';

class ParticipantsTable extends Component {
  render() {
    const { studyId, participants, sortBy } = this.props;

    const updatedParticipants = participants.map(participant => {
      const studyInfo =
        (participant?.studiesInfo && participant?.studiesInfo[studyId]) || {};
      const condition = studyInfo?.blockName;

      return {
        ...participant,
        username: participant.username,
        publicReadableId: participant.publicReadableId,
        condition,
      };
    });

    const sortedParticipants = [...updatedParticipants].sort((a, b) =>
      a[sortBy] > b[sortBy] ? 1 : -1
    );

    return (
      <div>
        {sortedParticipants.map((participant, num) => (
          <ParticipantRow
            key={num}
            num={num}
            participant={participant}
            studyId={this.props.studyId}
            openParticipant={this.props.openParticipant}
            consents={this.props.consents}
          />
        ))}
      </div>
    );
  }
}

export default ParticipantsTable;
