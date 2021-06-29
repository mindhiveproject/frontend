import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../../../../ErrorMessage/index';

import Result from './result';

const PARTICIPANT_RESULTS_QUERY = gql`
  query PARTICIPANT_RESULTS_QUERY($participantId: ID!) {
    participantResults(participantId: $participantId) {
      id
      quantity
      data
      dataPolicy
      token
      createdAt
      updatedAt
      payload
      study {
        id
        title
      }
      task {
        id
        title
      }
      user {
        id
        publicId
        publicReadableId
      }
      info
      incrementalData {
        id
        content
      }
      fullData {
        id
        content
      }
      resultType
    }
  }
`;

class ParticipantResults extends Component {
  render() {
    const { participantId } = this.props;
    return (
      <div>
        <h3>Results</h3>
        <Query query={PARTICIPANT_RESULTS_QUERY} variables={{ participantId }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.participantResults)
              return <p>No participant found for {participantId}</p>;
            const { participantResults } = data;
            return (
              <>
                <div className="resultItem">
                  <div>Study</div>
                  <div>Task</div>
                  <div>Created</div>
                  <div>Updated</div>
                  <div>Data policy</div>
                  <div>Payload type</div>
                  <div>Is full data?</div>
                  <div># Files</div>
                  <div># Incremental uploads</div>
                  <div>Type</div>
                  <div></div>
                  <div></div>
                </div>
                {participantResults.map(result => (
                  <Result
                    key={result.id}
                    result={result}
                    refetchQueries={[
                      {
                        query: PARTICIPANT_RESULTS_QUERY,
                        variables: { participantId },
                      },
                    ]}
                  />
                ))}
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ParticipantResults;
