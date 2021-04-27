import React, { Component } from 'react';

import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component'; // https://www.npmjs.com/package/react-rating-stars-component

const StyledBoard = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-auto-flow: column;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;

  .section {
    display: grid;
    grid-gap: 1rem;
    min-width: 300px;
    background: white;
    padding: 20px;
    text-align: center;
    align-content: baseline;
    .averageRating {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-self: center;
    }
  }

  .cards {
    display: grid;
    grid-gap: 1rem;
  }

  .card {
    display: grid;
    grid-gap: 1rem;
    padding: 28px 15px 13px 25px;
    color: #1a1a1a;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: left;
  }
`;

class Board extends Component {
  computeAverage = array => {
    const arr = array.filter(element => !!element);
    if (arr.length === 0) {
      return null;
    }
    return parseInt(arr.reduce((a, b) => a + b) / arr.length);
  };

  render() {
    const { sections } = this.props;
    return (
      <StyledBoard>
        {sections.map((section, num) => (
          <div className="section">
            <h4>{section.title}</h4>
            <div className="averageRating">
              <div>Average</div>
              <div>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  isHalf
                  value={this.computeAverage(
                    section.content.map(content => parseFloat(content.rating))
                  )}
                  edit={false}
                />
              </div>
            </div>
            <div className="cards">
              {section.content
                .filter(card => card.answer)
                .map(card => (
                  <div className="card">
                    <h4>{card.title}</h4>
                    {card.answer}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </StyledBoard>
    );
  }
}

export default Board;
