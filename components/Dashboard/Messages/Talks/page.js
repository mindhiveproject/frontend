import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';

import Head from 'next/head';
import moment from 'moment';
import { Menu } from 'semantic-ui-react';
import Error from '../../../ErrorMessage/index';

import { StyledDasboard, StyledDevelopDasboard } from '../../styles';

import Message from './Messages/message';
import CreateMessage from './Messages/create';

const StyledGroupChat = styled.div`
  display: grid;
  grid-gap: 2rem;
  margin: 2rem 0rem;
  .members {
    font-size: 1.2rem;
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    justify-content: end;
    .member {
      display: grid;
      background: white;
      border: 2px solid #007c70;
      width: max-content;
      padding: 0.7rem;
      border-radius: 2rem;
      justify-content: center;
    }
  }
`;

const VIEW_TALK_QUERY = gql`
  query VIEW_TALK_QUERY($id: ID!) {
    talk(where: { id: $id }) {
      id
      author {
        id
        publicReadableId
      }
      members {
        id
        username
      }
      settings
      createdAt
      words {
        id
        author {
          publicReadableId
          username
        }
        message
        settings
        new
        createdAt
      }
    }
  }
`;

class TalkPage extends Component {
  state = {};

  render() {
    const { talkId } = this.props;

    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <div>
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
                ← Back
              </span>
            </div>
          </div>

          <Query
            query={VIEW_TALK_QUERY}
            variables={{ id: talkId }}
            pollInterval={5000}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.talk) return <p>No talk found for {talkId}</p>;
              const { talk } = data;
              const messages = [...talk?.words].sort((a, b) =>
                a.createdAt > b.createdAt
                  ? -1
                  : b.createdAt > a.createdAt
                  ? 1
                  : 0
              );
              return (
                <StyledGroupChat>
                  <Head>
                    <title>mindHIVE | {talkId}</title>
                  </Head>
                  <div className="navigationHeader">
                    <div>
                      <h1>{talk?.settings?.title}</h1>
                    </div>
                    <div>
                      <CreateMessage talkId={talkId} />
                    </div>
                  </div>
                  <div className="members">
                    {talk?.members?.map(member => (
                      <div className="member">{member?.username}</div>
                    ))}
                  </div>
                  <div>
                    {messages.map(message => (
                      <Message key={message.id} message={message} />
                    ))}
                  </div>
                </StyledGroupChat>
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default TalkPage;
export { VIEW_TALK_QUERY };
