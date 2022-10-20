import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import { Mutation, Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Post from '../../Jodit/post';

import { GET_CARD_CONTENT } from '../../../Queries/Proposal';
import { UPDATE_CARD_CONTENT } from '../../../Mutations/Proposal';

const StyledCardPreview = styled.div`
  display: grid;
  grid-gap: 10px;
  .description {
    background: #fbfaf7;
    padding: 10px 5px;
    border-radius: 7px;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: end;
  grid-gap: 10px;
  .primary {
    background: #007c70;
    color: #ffffff;
    border: 2px solid #007c70;
  }
  .secondary {
    background: #ffffff;
    color: #666666;
    border: 2px solid #b3b3b3;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  align-items: center;
  padding: 14px 24px;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: center;
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
    const {
      title,
      description,
      content,
      comment,
      settings,
      assignedTo,
    } = this.state;
    const { cardId, boardId, onClose } = this.props;
    await updateCardMutation({
      variables: {
        id: cardId,
        boardId,
        title,
        description,
        content,
        comment,
        settings,
        assignedTo,
      },
      refetchQueries: [{ query: GET_CARD_CONTENT, variables: { id: cardId } }],
    });
    onClose();
  };

  render() {
    const {
      cardId,
      boardId,
      open,
      onClose,
      proposalBuildMode,
      adminMode,
    } = this.props;
    const {
      title,
      content,
      comment,
      description,
      assignedTo,
      settings,
    } = this.state;
    return (
      <Modal
        open={open}
        closeOnDimmerClick={false}
        size="large"
        onClose={() => onClose()}
      >
        <Modal.Content scrolling>
          <Modal.Description>
            <Query query={GET_CARD_CONTENT} variables={{ id: cardId }}>
              {({ data, loading: queryLoading }) => {
                if (queryLoading) return <p>Loading ... </p>;
                const { proposalCard } = data;
                if (this.props.isPreview) {
                  return (
                    <StyledCardPreview>
                      <h2>{proposalCard?.title}</h2>
                      {proposalCard?.description && (
                        <div className="description">
                          {ReactHtmlParser(proposalCard?.description)}
                        </div>
                      )}
                      <div>{ReactHtmlParser(proposalCard?.content)}</div>
                    </StyledCardPreview>
                  );
                }
                return (
                  <Post
                    proposalBuildMode={this.props.proposalBuildMode}
                    title={
                      typeof title === 'undefined' ? proposalCard.title : title
                    }
                    onChange={this.handleChange}
                    content={content || proposalCard.content}
                    comment={comment || proposalCard.comment}
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
                    readonly={adminMode}
                    isPreview={this.props.isPreview}
                  />
                );
              }}
            </Query>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.props.isPreview ? (
            <StyledButtons>
              <StyledButton className="secondary" onClick={() => onClose()}>
                Close
              </StyledButton>
            </StyledButtons>
          ) : (
            <Mutation mutation={UPDATE_CARD_CONTENT}>
              {(updateCard, { loading, error }) => (
                <StyledButtons>
                  {!loading && (
                    <StyledButton
                      disabled={loading}
                      className="secondary"
                      onClick={() => onClose()}
                    >
                      Close without saving
                    </StyledButton>
                  )}
                  {!adminMode && (
                    <StyledButton
                      className="primary"
                      onClick={() => this.onUpdateCard(updateCard)}
                      disabled={loading}
                    >
                      {loading ? 'Saving ...' : 'Save & close'}
                    </StyledButton>
                  )}
                </StyledButtons>
              )}
            </Mutation>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CardModal;
