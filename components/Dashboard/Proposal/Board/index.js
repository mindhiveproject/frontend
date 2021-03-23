import React, { Component } from 'react';
import Board from './board';
import CardContainer from '../Card/index';

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
          <Board id={this.props.id} openCard={this.openCard} />
        </div>
      );
    }

    if (this.state.page === 'card') {
      return (
        <div>
          <CardContainer
            cardId={this.state.cardId}
            boardId={this.props.id}
            close={this.closeCard}
          />
        </div>
      );
    }
  }
}

export default ProposalContainer;
