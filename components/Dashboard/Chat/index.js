import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Error from "../../ErrorMessage/index";
import { CURRENT_USER_EMAIL_QUERY } from "../../Queries/User";

import ChatWrapper from "./wrapper";

import { StyledDasboard } from "../styles";

class Chat extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_EMAIL_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading ...</p>;
          if (!data?.me) return <h2>Please sign up or log in.</h2>;

          return (
            <StyledDasboard>
              <ChatWrapper
                key={this.props.chatId}
                {...this.props}
                openedPage={this.props.chatId ? "chatpage" : null}
                openedChatId={this.props.chatId}
                user={data?.me}
              />
            </StyledDasboard>
          );
        }}
      </Query>
    );
  }
}

export default Chat;
