import React, { Component } from 'react';
import ParticipantRow from './row';

class ParticipantsTable extends Component {
  render() {
    const { studyId, participants, sortBy } = this.props;

    // console.log('sortBy', sortBy);

    const updatedParticipants = participants.map(participant => {
      const studyInfo =
        (participant?.studiesInfo && participant?.studiesInfo[studyId]) || {};
      // console.log('studyInfo', studyInfo);
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

    // console.log('sortedParticipants', sortedParticipants);

    return (
      <div>
        {sortedParticipants.map((participant, num) => (
          <ParticipantRow
            key={num}
            num={num}
            participant={participant}
            studyId={this.props.studyId}
            openParticipant={this.props.openParticipant}
          />
        ))}
      </div>
    );
  }
}

export default ParticipantsTable;
