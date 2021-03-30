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
      description
      content
      settings
      assignedTo {
        id
        username
      }
    }
  }
`;

const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION(
    $id: ID!
    $boardId: ID!
    $title: String
    $description: String
    $content: String
    $settings: Json
    $assignedTo: [String]
  ) {
    updateProposalCard(
      id: $id
      boardId: $boardId
      title: $title
      description: $description
      content: $content
      settings: $settings
      assignedTo: $assignedTo
    ) {
      id
    }
  }
`;

class CardModal extends Component {
  state = {};

  // update title in the local state
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  // update card content in the local state
  handleContentChange = content => {
    if (content) {
      this.setState({
        content,
      });
    }
  };

  // update the assignedTo in the local state
  handleAssignedToChange = assignedTo => {
    this.setState({
      assignedTo,
    });
  };

  // update the settings in the local state
  handleSettingsChange = (name, value) => {
    this.setState({
      settings: { ...this.state.settings, [name]: value },
    });
  };

  // update card on the server
  onUpdateCard = async updateCardMutation => {
    const { title, description, content, settings, assignedTo } = this.state;
    const { cardId, boardId, onClose } = this.props;
    await updateCardMutation({
      variables: {
        id: cardId,
        boardId,
        title,
        description,
        content,
        settings,
        assignedTo,
      },
      refetchQueries: [{ query: GET_CARD_CONTENT, variables: { id: cardId } }],
    });
  };

  render() {
    const { cardId, boardId, open, onClose, proposalBuildMode } = this.props;
    const { title, content, description, assignedTo } = this.state;
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
                return (
                  <Post
                    proposalBuildMode={this.props.proposalBuildMode}
                    title={
                      typeof title === 'undefined' ? proposalCard.title : title
                    }
                    onChange={this.handleChange}
                    content={content || proposalCard.content}
                    onContentChange={this.handleContentChange}
                    description={description || proposalCard.description}
                    assignedTo={
                      typeof assignedTo === 'undefined'
                        ? proposalCard.assignedTo.map(c => c.username)
                        : assignedTo
                    }
                    onAssignedToChange={this.handleAssignedToChange}
                    settings={
                      typeof settings === 'undefined'
                        ? proposalCard.settings
                        : settings
                    }
                    onSettingsChange={this.handleSettingsChange}
                    proposal={this.props.proposal}
                    card={proposalCard}
                  />
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
