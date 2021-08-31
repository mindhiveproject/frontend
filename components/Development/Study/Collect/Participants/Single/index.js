import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../../../../ErrorMessage/index';
import ParticipantDisplay from './display';

import {
  StyledDasboard,
  StyledDevelopDasboard,
} from '../../../../../Dashboard/styles';

const PARTICIPANT_QUERY = gql`
  query PARTICIPANT_QUERY($participantId: ID!, $studyId: ID!) {
    participant(participantId: $participantId, studyId: $studyId) {
      id
      username
      authEmail {
        email
      }
      publicId
      publicReadableId
      studiesInfo
      tasksInfo
      consentsInfo
      generalInfo
      consentGivenFor {
        id
        title
        description
        organization
      }
    }
  }
`;

class SinglePage extends Component {
  render() {
    const { participantId, studyId, goBack } = this.props;
    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <div style={{ marginBottom: '2rem' }}>
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
                ← Back
              </span>
            </div>
          </div>
          <Query
            query={PARTICIPANT_QUERY}
            variables={{ participantId, studyId }}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.participant)
                return (
                  <p>No participant found for {this.props.participantId}</p>
                );
              const { participant } = data;
              return (
                <ParticipantDisplay
                  participant={participant}
                  studyId={studyId}
                />
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default SinglePage;
