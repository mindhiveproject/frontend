import React, { Component } from 'react';
import Board from './board';
import CardContainer from '../Card/index';
import ProposalHeader from '../ProposalPage/proposalHeader';

class ProposalContainer extends Component {
  state = {
    page: 'board',
    cardId: null,
  };

  openCard = cardId => {
    this.setState({
      page: 'card',
      cardId,
    });
  };

  closeCard = () => {
    this.setState({
      page: 'board',
      cardId: null,
    });
  };

  render() {
    if (this.state.page === 'board') {
      return (
        <div>
          <>
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.onClose}>
                ← Back
              </span>
            </div>
          </>
          <ProposalHeader proposal={this.props.proposal} />
          <Board id={this.props.proposal.id} openCard={this.openCard} />
        </div>
      );
    }

    if (this.state.page === 'card') {
      return (
        <div>
          <CardContainer
            cardId={this.state.cardId}
            boardId={this.props.proposal.id}
            close={this.closeCard}
          />
        </div>
      );
    }
  }
}

export default ProposalContainer;
