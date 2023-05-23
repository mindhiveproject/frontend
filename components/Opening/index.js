import React, { Component } from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import { StyledOpening, CloseButton } from "./styles";

import Chat from "../Dashboard/Chat/index";

// use @client to look at only client (and do not check the server )
const LOCAL_STATE_QUERY = gql`
  query {
    openingOpen @client
  }
`;

const LOCAL_CHAT_ID_QUERY = gql`
  query {
    chatId @client
  }
`;

const TOGGLE_OPENING_MUTATION = gql`
  mutation($chatId: ID) {
    toggleOpening(chatId: $chatId) @client
  }
`;

/* eslint-disable */
// compose all components together
const Composed = adopt({
  toggleOpening: ({ render }) => (
    <Mutation mutation={TOGGLE_OPENING_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
  localChatId: ({ render }) => (
    <Query query={LOCAL_CHAT_ID_QUERY}>{render}</Query>
  ),
});
/* eslint-enable */

class Dashboard extends Component {
  render() {
    return (
      <Composed>
        {({ toggleOpening, localState, localChatId }) => (
          <StyledOpening open={localState?.data?.openingOpen}>
            <div className="inner">
              <header>
                <CloseButton title="close" onClick={toggleOpening}>
                  &times;
                </CloseButton>
              </header>
              <Chat chatId={localChatId?.data?.chatId} />
            </div>
          </StyledOpening>
        )}
      </Composed>
    );
  }
}

export default Dashboard;
export { LOCAL_STATE_QUERY, LOCAL_CHAT_ID_QUERY, TOGGLE_OPENING_MUTATION };
