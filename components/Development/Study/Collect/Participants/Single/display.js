import React, { Component } from 'react';
import moment from 'moment';
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
            <span
              style={{
                'font-size': '2rem',
                'font-weight': 'bold',
                background: '#007c70',
                padding: '0rem 1rem',
                margin: '0rem 0.5rem',
                'border-radius': '1rem',
                color: 'white',
              }}
            >
              {participant.publicReadableId ||
                participant.publicId ||
                participant.id ||
                'John Doe'}
            </span>
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
                    <p>{studyInfo[key] === 'yes' ? 'Yes' : 'No'}</p>
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
              if (key === 'share') {
                return (
                  <div className="infoItem" key={key}>
                    <p>Agreed to save information for future studies</p>
                    <p>{studyInfo[key] === 'true' ? 'Yes' : 'No'}</p>
                  </div>
                );
              }
              if (key === 'zip' && studyInfo.zip) {
                return (
                  <div className="infoItem" key={key}>
                    <p>Zip code</p>
                    <p>{studyInfo[key]}</p>
                  </div>
                );
              }
              if (key === 'bd' && studyInfo.bd) {
                return (
                  <div className="infoItem" key={key}>
                    <p>Birthday</p>
                    <p>
                      {moment(parseInt(studyInfo[key])).format('MMMM D, YYYY')}
                    </p>
                  </div>
                );
              }
            })}
          </div>

          <div>
            <h3>Consents</h3>
            {!participant?.consentGivenFor?.length ? (
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

          <ParticipantResults
            participantId={participant.id}
            studyId={studyId}
          />
        </StyledParticipantPage>
      </StyledCollectSection>
    );
  }
}

export default ParticipantDisplay;
