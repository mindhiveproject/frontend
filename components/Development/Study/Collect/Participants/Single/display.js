import React, { Component } from 'react';
import ParticipantResults from './results';
import { StyledCollectSection, StyledParticipantPage } from '../styles';

class ParticipantDisplay extends Component {
  render() {
    const { participant, studyId } = this.props;
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

    return (
      <StyledCollectSection>
        <StyledParticipantPage>
          <p>
            <span>Username </span> <strong>{participant.username}</strong>
          </p>

          <p>
            <span>Readable ID </span>
            <strong>{participant.publicReadableId}</strong>
          </p>
          <div>
            <h3>Study-related information</h3>
            {Object.keys(studyInfo).map(key => {
              if (key === 'eng') {
                return (
                  <div className="infoItem" key={key}>
                    <p>
                      Do you understand basic instruction written in English?
                    </p>
                    <p>{studyInfo[key]}</p>
                  </div>
                );
              }
              if (key === 'blockName') {
                return (
                  <div className="infoItem" key={key}>
                    <p>Between-subject condition</p>
                    <p>{studyInfo[key]}</p>
                  </div>
                );
              }
            })}
          </div>
          <ParticipantResults participantId={participant.id} />
        </StyledParticipantPage>
      </StyledCollectSection>
    );
  }
}

export default ParticipantDisplay;
