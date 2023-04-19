import React, { Component } from "react";

import { Query } from "@apollo/client/react/components";
import moment from "moment";
import Error from "../../../../ErrorMessage/index";

import ChangeResultsStatus from "./changeResultsStatus";

import { PARTICIPANT_STUDY_RESULTS_QUERY } from "../../../../Queries/Result";

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
            (result) => result.fullData?.id
          ).length;
          const numberIncremental = participantStudyResults.filter(
            (result) => result.incrementalData?.length
          ).length;

          const timestampsCreated = participantStudyResults
            .map((result) => result.createdAt)
            .sort((a, b) => new Date(a) - new Date(b));

          // const started = timestampsCreated.length
          //   ? moment(timestampsCreated[0]).format("MMMM D, YYYY, h:mma")
          //   : "";

          let started = "";
          if (
            consents.length &&
            consents[0].id &&
            participant?.consentsInfo[consents[0].id]?.createdAt
          ) {
            const consentId = consents[0].id;
            started = moment(
              participant?.consentsInfo[consentId]?.createdAt
            ).format("MMMM D, YYYY, h:mma");
          }

          const timestampsUpdated = participantStudyResults
            .map((result) => result.createdAt)
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
                  .format("HH:mm:ss")
              : "";

          const resultTypes = participantStudyResults.map(
            (result) => result.resultType
          );
          const doResultsExist = !!resultTypes.length;
          const isIncluded = resultTypes.every((type) => type === "MAIN");

          return (
            <div className="tableRow">
              <div
                onClick={() => {
                  if (participant?.info?.type === "Guest") {
                    this.props.openGuestParticipant(participant.id);
                  } else {
                    this.props.openParticipant(participant.id);
                  }
                }}
              >
                <a>
                  {participant.publicReadableId ||
                    participant.publicId ||
                    `${participant.id.slice(0, 10)}...` ||
                    "John Doe"}
                </a>
              </div>

              <div>{duration}</div>
              <div>{numberFull}</div>

              <div>{participant?.condition}</div>

              <div>
                {consents.map((consent, i) => (
                  <div key={i}>
                    <span>
                      {(participant?.consentsInfo &&
                        participant?.consentsInfo[consent?.id] &&
                        participant?.consentsInfo[consent?.id]?.decision) ||
                        "No info"}
                    </span>
                  </div>
                ))}
              </div>
              <div>{started}</div>
              <div>{participant?.info?.type}</div>
              {doResultsExist ? (
                <ChangeResultsStatus
                  type={participant?.info?.type}
                  participantId={participant.id}
                  studyId={studyId}
                  isIncluded={isIncluded}
                />
              ) : (
                <div></div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ParticipantRow;
