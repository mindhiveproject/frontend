import React, { Component } from 'react';
import { Container, Draggable } from "react-smooth-dnd";

import styled from 'styled-components'

const StyledCard = styled.div`
  border: 1px brown solid;
  background: #ffffea;
`

class Card extends Component {

  render() {
    const { card } = this.props;
    return (
      <Draggable key={card.id}>
        <StyledCard>
          <div className="card-drag-handle">
          {card.title}
          </div>
          <div>
            <button onClick={() => {this.props.onDeleteCard(card.id)}}>X</button>
          </div>
        </StyledCard>
      </Draggable>
    );
  }

}

export default Card;
