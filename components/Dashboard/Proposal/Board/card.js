import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import styled from 'styled-components';
import CardContainer from '../Card/index';

const StyledCard = styled.div`
  border: 1px brown solid;
  background: #ffffea;
`;

class Card extends Component {
  state = {
    open: false,
    cardId: null,
  };

  openCard = id => {
    this.setState({
      open: true,
      cardId: id,
    });
  };

  closeCardContainer = () => {
    this.setState({
      open: false,
      cardId: null,
    });
  };

  render() {
    const { card } = this.props;
    return (
      <Draggable key={card.id}>
        <StyledCard>
          <div className="card-drag-handle">{card.title}</div>
          <div>
            <button
              onClick={() => {
                this.props.onDeleteCard(card.id);
              }}
            >
              X
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.openCard(card.id);
              }}
            >
              Open
            </button>
          </div>
          {this.state.open && (
            <CardContainer
              cardId={this.state.cardId}
              boardId={this.props.boardId}
              close={this.closeCardContainer}
            />
          )}
        </StyledCard>
      </Draggable>
    );
  }
}

export default Card;
