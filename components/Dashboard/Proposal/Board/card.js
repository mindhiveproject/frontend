import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Container, Draggable } from 'react-smooth-dnd';

import { StyledCard } from './styles';

class Card extends Component {
  render() {
    const { card, proposalBuildMode, adminMode } = this.props;
    const status = card?.settings?.status? card.settings.status : 'Not started';

    let statusStyle = null;
    switch (status) {
      default:
        statusStyle = 'status-not-started';
        break;
      case 'Started':
        statusStyle = 'status-started';
        break;
      case 'On-Hold':
        statusStyle = 'status-on-hold';
        break;
      case 'Completed':
        statusStyle = 'status-completed';
        break;
      case 'Closed':
        statusStyle = 'status-closed';
    }

    return (
      <Draggable key={card.id}>
        <StyledCard
          onClick={() => {
            this.props.openCard(card.id);
          }}
        >
          <div className="card-drag-handle">
            <h4>{ReactHtmlParser(card.title)}</h4>
            {!proposalBuildMode && (
              <div className="card-information">
                <div className="info-assigned-container">
                  {card?.assignedTo.length
                    ? card?.assignedTo.map((user, i) => (
                        <div key={i} className="info-assigned">
                           
                          {adminMode
                            ? user?.publicReadableId || 'John Doe'
                            : user?.username}
                        </div>
                      ))
                    : ''}
                </div>
                {status && (
                  <div className={`info-status ${statusStyle}`}>{status}</div>
                )}
              </div>
            )}
          </div>
        </StyledCard>
        {(true || proposalBuildMode) && (
          <div
            className="deleteBtn"
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to delete this card? This action cannot be undone.'
                )
              ) {
                this.props.onDeleteCard(card.id);
              }
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
