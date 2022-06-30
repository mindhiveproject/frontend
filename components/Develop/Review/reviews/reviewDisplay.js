import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

import styled from 'styled-components';
import Review from './review';

const StyledFullReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    'header'
    'content';
  height: 85vh;

  .header {
    grid-area: header;
    padding: 0rem 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
    font-size: 18px;
    .backBtn {
      cursor: pointer;
    }
    .headerLeft {
    }
  }
  .content {
    grid-area: content;
    background: #f7f9f8;
    padding: 1rem 2rem;
    overflow-y: scroll;
  }
`;

class ReviewDisplay extends Component {
  state = {};

  render() {
    const { review, reviewNumber } = this.props;
    return (
      <StyledFullReviewContainer>
        <div className="header">
          <div className="headerLeft">
            <div className="backBtn" onClick={this.props.closeReview}>
              ← Exit{' '}
              {review?.stage === 'INDIVIDUAL'
                ? ' individual review'
                : 'synthesis'}{' '}
              {reviewNumber}
            </div>
          </div>
          <div className="headerRight"></div>
        </div>

        <div className="content">
          <Review review={review} view={this.state.view} />
        </div>
      </StyledFullReviewContainer>
    );
  }
}

export default ReviewDisplay;
