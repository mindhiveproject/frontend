import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

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

class CardModal extends Component {
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
    const { content, title } = this.state;
    const { cardId, boardId, onClose } = this.props;
    await updateCardMutation({
      variables: {
        id: cardId,
        boardId,
        content,
        title,
      },
      refetchQueries: [{ query: GET_CARD_CONTENT, variables: { id: cardId } }],
    });
  };

  render() {
    const { cardId, boardId, open, onClose, proposalBuildMode } = this.props;
    const { title, content } = this.state;
    return (
      <Modal
        open={open}
        closeOnDimmerClick={false}
        size="large"
        onClose={() => onClose()}
      >
        <Modal.Content>
          <Modal.Description>
            <Query query={GET_CARD_CONTENT} variables={{ id: cardId }}>
              {({ data, loading: queryLoading }) => {
                if (queryLoading) return <p>Loading ... </p>;
                const { proposalCard } = data;
                const cardContent = proposalCard.content;

                return (
                  <Mutation mutation={UPDATE_CARD_MUTATION}>
                    {(updateCard, { loading, error }) => (
                      <div>
                        <Post
                          loading={loading}
                          title={
                            typeof title === 'undefined'
                              ? proposalCard.title
                              : title
                          }
                          onTitleChange={this.handleTitleChange}
                          content={content || cardContent}
                          onContentChange={this.handleContentChange}
                          proposalBuildMode={this.props.proposalBuildMode}
                        />
                      </div>
                    )}
                  </Mutation>
                );
              }}
            </Query>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="orange" onClick={() => onClose()}>
            <Mutation mutation={UPDATE_CARD_MUTATION}>
              {(updateCard, { loading, error }) => (
                <div onClick={() => this.onUpdateCard(updateCard)}>
                  Save & Close
                </div>
              )}
            </Mutation>
          </Button>
          <Button color="black" onClick={() => onClose()}>
            Close without saving
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CardModal;
