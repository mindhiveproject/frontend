import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/client/react/components';
import ParticipantsOverview from './overview';
import MessageSender from './message';

import InDev from '../../inDev';

import SinglePage from './Single/index';
import SingleGuestPage from './Single/guest';
import { StyledCollectSection, StyledCollectBoard } from './styles';

const MY_STUDY_PARTICIPANTS_QUERY = gql`
  query MY_STUDY_PARTICIPANTS_QUERY($id: ID!) {
    myStudyParticipants(where: { id: $id }) {
      id
      consent {
        id
        title
      }
      participants {
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
      guests {
        id
        publicId
        publicReadableId
        studiesInfo
        tasksInfo
        consentsInfo
        generalInfo
      }
    }
  }
`;

const MAIL_MY_STUDY_PARTICIPANTS = gql`
  mutation MAIL_MY_STUDY_PARTICIPANTS($id: ID!, $info: Json) {
    emailMyStudyParticipants(where: { id: $id }, info: $info) {
      message
    }
  }
`;

class StudyParticipants extends Component {
  state = {
    info: {
      header: 'I am a header',
      message: 'Hey, wake up!',
    },
    page: this.props.page || 'participants',
    participantId: null,
  };

  openParticipant = participantId => {
    this.setState({
      page: 'participant',
      participantId,
    });
  };

  openGuestParticipant = participantId => {
    this.setState({
      page: 'guestParticipant',
      participantId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'participants',
      participantId: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'participants') {
      return (
        <Query
          query={MY_STUDY_PARTICIPANTS_QUERY}
          variables={{ id: this.props.id }}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.myStudyParticipants)
              return <p>No participants found for {this.props.id}</p>;
            // const {
            //   myStudyParticipants: { participants, guests },
            // } = data;
            const consents = data?.myStudyParticipants?.consent || [];

            const loggedInUsers = data?.myStudyParticipants?.participants || [];
            const guests = data?.myStudyParticipants?.guests || [];
            const participants = [...loggedInUsers, ...guests];

            return (
              <StyledCollectSection>
                <StyledCollectBoard>
                  {false && (
                    <div>
                      <MessageSender type="Study" id={this.props.id} />
                      <Mutation
                        mutation={MAIL_MY_STUDY_PARTICIPANTS}
                        variables={{ id: this.props.id, info: this.state.info }}
                      >
                        {(mailParticipants, { loading, error }) => (
                          <div>
                            <button onClick={mailParticipants}>
                              Send email
                            </button>
                          </div>
                        )}
                      </Mutation>
                    </div>
                  )}
                  <div className="general">
                    <p>
                      Share the link below with your participants to invite them
                      to join your study
                    </p>
                    <p>
                      <h3>
                        https://mindhive.science/studies/{this.props.studySlug}
                      </h3>
                    </p>
                  </div>

                  <ParticipantsOverview
                    participants={participants}
                    studyId={this.props.id}
                    openParticipant={this.openParticipant}
                    openGuestParticipant={this.openGuestParticipant}
                    consents={consents}
                  />
                </StyledCollectBoard>
              </StyledCollectSection>
            );
          }}
        </Query>
      );
    }

    if (page === 'participant') {
      return (
        <SinglePage
          participantId={this.state.participantId}
          studyId={this.props.id}
          goBack={this.goBack}
        />
      );
    }

    if (page === 'guestParticipant') {
      return (
        <SingleGuestPage
          participantId={this.state.participantId}
          studyId={this.props.id}
          goBack={this.goBack}
        />
      );
    }
  }
}

export default StudyParticipants;
