import React, { Component } from 'react';

import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';

const StyledReviewBoard = styled.div`
  display: grid;
  grid-gap: 30px;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;

  .block {
    display: grid;
    grid-gap: 1rem;
    min-width: 300px;
    background: white;
    padding: 20px;
    text-align: center;
    align-content: baseline;
    .rating {
      display: grid;
      align-items: center;
      justify-self: center;
    }
  }
`;

class Review extends Component {
  render() {
    const { review } = this.props;

    return (
      <StyledReviewBoard>
        {review?.content.map(item => (
          <div className="block">
            <h3>{item?.question}</h3>
            {review?.stage === 'INDIVIDUAL' && (
              <div className="rating">
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  isHalf
                  value={item.rating}
                  edit={false}
                />
              </div>
            )}
            <p>{item?.answer}</p>
          </div>
        ))}
      </StyledReviewBoard>
    );
  }
}

export default Review;
