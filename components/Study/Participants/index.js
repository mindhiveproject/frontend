import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import MessageSender from './message';

const MY_STUDY_PARTICIPANTS_QUERY = gql`
  query MY_STUDY_PARTICIPANTS_QUERY($id: ID!) {
    myStudyParticipants(where: { id: $id }) {
      id
      participants {
        id
        username
        authEmail {
          email
        }
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
  };

  render() {
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
          const {
            myStudyParticipants: { participants },
          } = data;
          if (!participants.length) return <h2>No participants</h2>;
          console.log('participants', participants);
          return (
            <div>
              <MessageSender type="Study" id={this.props.id} />
              <Mutation
                mutation={MAIL_MY_STUDY_PARTICIPANTS}
                variables={{ id: this.props.id, info: this.state.info }}
              >
                {(mailParticipants, { loading, error }) => (
                  <div>
                    <button onClick={mailParticipants}>Send email</button>

                    {participants.map(participant => (
                      <div key={participant.id} participant={participant}>
                        {participant.username}{' '}
                        {participant.authEmail.length
                          ? participant.authEmail[0].email
                          : ''}
                      </div>
                    ))}
                  </div>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default StudyParticipants;
