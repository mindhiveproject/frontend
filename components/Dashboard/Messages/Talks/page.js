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
                  <div>
                    {talk?.words.map(message => (
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
