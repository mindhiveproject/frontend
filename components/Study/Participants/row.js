import React, { Component } from 'react';

class ParticipantRow extends Component {
  render() {
    const { participant, num, studyId } = this.props;
    let email = '';
    if (
      participant?.authEmail &&
      participant?.authEmail.length &&
      participant?.authEmail[0]?.email
    ) {
      email = participant?.authEmail[0]?.email;
    }
    const studyInfo =
      (participant?.studiesInfo && participant?.studiesInfo[studyId]) || {};
    // console.log('studyInfo', studyInfo);

    return (
      <div
        className="tableRow"
        onClick={() => this.props.openParticipant(participant.id)}
      >
        <div>{participant.username}</div>
        <div>{participant.publicReadableId}</div>
        <div>{email}</div>
        <div>{studyInfo?.blockName}</div>
      </div>
    );
  }
}

export default ParticipantRow;

// <div>{studyInfo.zip}</div>
// <div>{studyInfo.share}</div>
// <div>{studyInfo.bd}</div>
