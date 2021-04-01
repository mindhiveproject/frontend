import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import { StyledCard } from './styles';

class Card extends Component {
  render() {
    const { card, proposalBuildMode } = this.props;
    const status = card?.settings?.status;
    const assignedTo = card?.assignedTo.map(user => user.username) || [];

    return (
      <Draggable key={card.id}>
        <StyledCard
          onClick={() => {
            this.props.openCard(card.id);
          }}
        >
          <div className="card-drag-handle">
            <h4>{card.title}</h4>
            {!proposalBuildMode && (
              <div className="card-information">
                <div className="info-assigned-container">
                  {assignedTo.length
                    ? assignedTo.map(user => (
                        <div key={user} className="info-assigned">
                          {user}
                        </div>
                      ))
                    : ''}
                </div>
                {status && <div className="info-status">{status}</div>}
              </div>
            )}
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
