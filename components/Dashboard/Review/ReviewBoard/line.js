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
  grid-template-columns: 4fr 2fr 1fr 1fr 2fr;
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
    let theClass;
    if (
      proposal?.author?.teacherIn &&
      proposal?.author?.teacherIn.length &&
      proposal?.author?.teacherIn[0].title
    ) {
      theClass = proposal?.author?.teacherIn[0].title;
    }
    if (
      proposal?.author?.studentIn &&
      proposal?.author?.studentIn.length &&
      proposal?.author?.studentIn[0].title
    ) {
      theClass = proposal?.author?.studentIn[0].title;
    }

    return (
      <StyledRow>
        <StyledClassRow>
          <div>{proposal?.study?.title}</div>
          <div>{theClass}</div>
          <div>{proposal?.isSubmitted ? '✔︎' : '𐄂'}</div>
          <div>
            {
              proposal?.reviews?.filter(review => review.stage === 'INDIVIDUAL')
                .length
            }
          </div>
          <div className="buttons">
            <div onClick={() => this.props.openReview(proposal.id)}>Review</div>
            <div onClick={() => this.props.openSynthesize(proposal.id)}>
              Synthesize
            </div>
          </div>
        </StyledClassRow>
      </StyledRow>
    );
  }
}

export default ReviewRow;
export { StyledClassRow };
