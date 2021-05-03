import React, { Component } from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: grid;
  padding: 20px 28px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
`;

class ReviewRow extends Component {
  render() {
    const { number, review, stage } = this.props;
    return (
      <StyledRow
        onClick={() => {
          this.props.selectReview(review, number);
        }}
      >
        <div>
          {stage === 'INDIVIDUAL' ? 'Review' : 'Synthesis'} {number}
        </div>
      </StyledRow>
    );
  }
}

export default ReviewRow;
