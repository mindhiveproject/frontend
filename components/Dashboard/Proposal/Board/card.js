import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import { StyledCard } from './styles';

class Card extends Component {
  render() {
    const { card, proposalBuildMode } = this.props;
    return (
      <Draggable key={card.id}>
        <StyledCard
          onClick={() => {
            this.props.openCard(card.id);
          }}
        >
          <div className="card-drag-handle">
            <h4>{card.title}</h4>
          </div>
        </StyledCard>
        {proposalBuildMode && (
          <div
            className="deleteBtn"
            onClick={() => {
              this.props.onDeleteCard(card.id);
            }}
          >
            Delete card
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;

// <div>
//   <button
//     onClick={() => {
//       this.props.openCard(card.id);
//     }}
//   >
//     Open
//   </button>
// </div>
