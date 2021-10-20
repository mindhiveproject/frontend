import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import TalkRow from './row';
import { StyledDasboard, StyledClassesDasboard } from '../../styles';

const StyledTalkHeader = styled.div`
  display: grid;
  margin: 1rem 0rem;
  padding: 1rem;
  grid-template-columns: 1fr 2fr 1fr;
  cursor: pointer;
  font-weight: bold;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_TALKS_QUERY = gql`
  query MY_TALKS_QUERY {
    myTalks {
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
    }
  }
`;

class TalksList extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>My group chats</h1>

          <Query query={MY_TALKS_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { myTalks } = data;
              if (myTalks.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any talks yet.</h3>
                    <p>Once you create a talk, it will appear here.</p>
                    <div className="navigationHeader">
                      <div>
                        <button onClick={this.props.addTalk}>
                          New group chat
                        </button>
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div>
                      <button onClick={this.props.addTalk}>
                        New group chat
                      </button>
                    </div>
                  </div>
                  <div>
                    <StyledTalkHeader>
                      <div>Name</div>
                      <div>Members</div>
                      <div>Date created</div>
                    </StyledTalkHeader>

                    {myTalks.map(mytalk => (
                      <TalkRow
                        mytalk={mytalk}
                        key={mytalk.id}
                        openTalk={this.props.openTalk}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default TalksList;
export { MY_TALKS_QUERY };
