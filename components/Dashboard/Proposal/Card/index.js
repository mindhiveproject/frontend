import React, { Component } from 'react';
import styled from 'styled-components';

import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Post from '../../Jodit/post';

const GET_CARD_CONTENT = gql`
  query GET_CARD_CONTENT($id: ID!) {
    proposalCard(where: { id: $id }) {
      id
      title
      content
    }
  }
`;

const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION(
    $id: ID!
    $boardId: ID!
    $title: String
    $content: String
  ) {
    updateProposalCard(
      id: $id
      boardId: $boardId
      title: $title
      content: $content
    ) {
      id
    }
  }
`;

const StyledCardContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 90%;
  height: 90%;
  overflow-y: auto;
  padding: 20px;
`;

const StyledCloseButton = styled.span`
  position: absolute;
  top: 1%;
  right: 1%;
  width: 3.3rem;
  line-height: 3rem;
  text-align: center;
  cursor: pointer;
  border-radius: 2.25rem;
  background-color: #4fbf1f;
  color: white;
  padding-bottom: 5px;
  font-size: 2rem;
  :hover {
    background-color: #ea0707;
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

class CardContainer extends Component {
  state = {};

  handleTitleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleContentChange = content => {
    if (content) {
      this.setState({
        content,
      });
    }
  };

  onUpdateCard = async updateCardMutation => {
    const res = await updateCardMutation({
      variables: {
        id: this.props.cardId,
        boardId: this.props.boardId,
        ...this.state,
      },
      refetchQueries: [
        { query: GET_CARD_CONTENT, variables: { id: this.props.cardId } },
      ],
    });
  };

  render() {
    return (
      <Query query={GET_CARD_CONTENT} variables={{ id: this.props.cardId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.proposalCard)
            return <p>No proposal card found for id {this.props.cardId}</p>;
          const { proposalCard } = data;
          return (
            <Mutation mutation={UPDATE_CARD_MUTATION}>
              {(updateCard, { loading, error }) => (
                <>
                  <StyledCardContainer>
                    <StyledInner>
                      <StyledCloseButton onClick={this.props.close}>
                        &times;
                      </StyledCloseButton>
                      <div>
                        <Post
                          onSubmit={async e => {
                            e.preventDefault();
                            const res = await this.onUpdateCard(updateCard);
                            this.props.close();
                          }}
                          loading={loading}
                          title={this.state.title || proposalCard.title}
                          onTitleChange={this.handleTitleChange}
                          content={this.state.content || proposalCard.content}
                          onContentChange={this.handleContentChange}
                          btnName="Save"
                        />
                      </div>
                    </StyledInner>
                  </StyledCardContainer>
                </>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default CardContainer;

// loading={loading}
// title={this.state.title}
// onTitleChange={this.handleTitleChange}
// content={this.state.content}
// onContentChange={this.handleContentChange}
// btnName="Save"
