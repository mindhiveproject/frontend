import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: 4fr 1fr 1fr;
  background: white;
  .buttons {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    cursor: pointer;
  }
`;

class ReviewRow extends Component {
  render() {
    const { proposal } = this.props;
    return (
      <StyledRow>
        <StyledClassRow>
          <div>{proposal?.study?.title}</div>
          <div>{proposal?.reviews?.length}</div>
          <div className="buttons">
            <div onClick={() => this.props.openReview(proposal.id)}>Review</div>
            {false && (
              <div onClick={() => this.props.openSynthesize(proposal.id)}>
                Synthesize
              </div>
            )}
          </div>
        </StyledClassRow>
      </StyledRow>
    );
  }
}

export default ReviewRow;
export { StyledClassRow };
