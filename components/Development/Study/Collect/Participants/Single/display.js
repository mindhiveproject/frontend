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
            <span>Participant ID </span>
            <strong>
              {participant.publicReadableId ||
                participant.publicId ||
                participant.id ||
                'John Doe'}
            </strong>
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

          <div>
            <h3>Consents</h3>
            {!participant.consentGivenFor.length ? (
              <p>No consents</p>
            ) : (
              <>
                <div className="resultItem">
                  <div>Title</div>
                  <div>Organization</div>
                  <div>Description</div>
                  <div>Decision</div>
                  <div>Save my consent for all covered studies/tasks</div>
                </div>
                {participant.consentGivenFor.map((consent, num) => (
                  <div className="infoItem" key={num}>
                    <p>{consent.title}</p>
                    <p>{consent.organization}</p>
                    <p>{consent.description}</p>
                    <p>
                      {participant?.consentsInfo &&
                        participant?.consentsInfo[consent?.id] &&
                        participant?.consentsInfo[consent?.id].decision}
                    </p>
                    <p>
                      {participant?.consentsInfo &&
                        participant?.consentsInfo[consent?.id] &&
                        participant?.consentsInfo[consent?.id]
                          .saveCoveredConsent}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          <ParticipantResults participantId={participant.id} />
        </StyledParticipantPage>
      </StyledCollectSection>
    );
  }
}

export default ParticipantDisplay;

// <p>
//   <span>Username </span> <strong>{participant.username}</strong>
// </p>
