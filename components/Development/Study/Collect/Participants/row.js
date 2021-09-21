import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import moment from 'moment';
import Error from '../../../../ErrorMessage/index';

import ChangeResultsStatus from './changeResultsStatus';

export const PARTICIPANT_STUDY_RESULTS_QUERY = gql`
  query PARTICIPANT_STUDY_RESULTS_QUERY($participantId: ID!, $studyId: ID!) {
    participantStudyResults(participantId: $participantId, studyId: $studyId) {
      id
      task {
        title
      }
      quantity
      data
      dataPolicy
      token
      createdAt
      updatedAt
      payload
      study {
        title
      }
      info
      incrementalData {
        id
      }
      fullData {
        id
      }
      resultType
    }
  }
`;

class ParticipantRow extends Component {
  render() {
    const { participant, num, studyId, consents } = this.props;

    return (
      <Query
        query={PARTICIPANT_STUDY_RESULTS_QUERY}
        variables={{ participantId: participant?.id, studyId }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.participantStudyResults)
            return <p>No participant found for id: {participantId}</p>;
          const { participantStudyResults } = data;

          // calculate the statistics for the participant
          const numberFull = participantStudyResults.filter(
            result => result.fullData?.id
          ).length;
          const numberIncremental = participantStudyResults.filter(
            result => result.incrementalData?.length
          ).length;

          const timestampsCreated = participantStudyResults
            .map(result => result.createdAt)
            .sort((a, b) => new Date(a) - new Date(b));
          const started = timestampsCreated.length
            ? moment(timestampsCreated[0]).format('MMMM D, YYYY, h:mma')
            : '';

          const timestampsUpdated = participantStudyResults
            .map(result => result.createdAt)
            .sort((a, b) => new Date(a) - new Date(b));
          const sortedTimestamps = [
            ...timestampsCreated,
            ...timestampsUpdated,
          ].sort((a, b) => new Date(b) - new Date(a));

          const duration =
            timestampsCreated.length && sortedTimestamps.length
              ? moment
                  .utc(
                    moment(sortedTimestamps[0]).diff(
                      moment(timestampsCreated[0])
                    )
                  )
                  .format('HH:mm:ss')
              : '';

          const resultTypes = participantStudyResults.map(
            result => result.resultType
          );
          const isTypesPresent = !!resultTypes.length;
          const isTest =
            !(resultTypes.includes('MAIN') || resultTypes.includes('REVIEW')) &&
            resultTypes.includes('TEST');

          return (
            <div className="tableRow">
              <div onClick={() => this.props.openParticipant(participant.id)}>
                <a>
                  {participant.publicReadableId ||
                    participant.publicId ||
                    participant.id ||
                    'John Doe'}
                </a>
              </div>

              <p>{duration}</p>
              <p>{numberFull}</p>
              <p>{started}</p>
              <p>{participant.condition}</p>
              {isTypesPresent ? (
                isTest ? (
                  <ChangeResultsStatus
                    participantId={participant.id}
                    studyId={studyId}
                    status="MAIN"
                  />
                ) : (
                  <ChangeResultsStatus
                    participantId={participant.id}
                    studyId={studyId}
                    status="TEST"
                  />
                )
              ) : (
                <div></div>
              )}
              <p>
                {consents.map(consent => (
                  <div>
                    <span>{consent.title}</span>
                    {' - '}
                    <span>
                      {(participant?.consentsInfo &&
                        participant?.consentsInfo[consent?.id] &&
                        participant?.consentsInfo[consent?.id]?.decision) ||
                        'No info'}
                    </span>
                    {' - '}
                    <span>
                      {(participant?.consentsInfo &&
                        participant?.consentsInfo[consent?.id] &&
                        participant?.consentsInfo[consent?.id]
                          ?.saveCoveredConsent) ||
                        'No info'}
                    </span>
                  </div>
                ))}
              </p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ParticipantRow;

// {thisStudyConsentInfo
//   ? thisStudyConsentInfo.saveCoveredConsent == 'true'
//     ? 'All studies'
//     : 'This study'
//   : 'Skipped'}
