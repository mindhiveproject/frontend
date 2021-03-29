import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DeleteReview from './deleteReview';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  cursor: pointer;
`;

class ReviewRow extends Component {
  render() {
    const { myproposal } = this.props;
    return (
      <StyledRow>
        <StyledClassRow onClick={() => this.props.openReview(myproposal)}>
          <div>{myproposal?.title}</div>
          <div>{myproposal?.sections?.length}</div>
          <div>{moment(myproposal?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
        <div className="deleteBtn">
          <DeleteReview proposalId={myproposal.id}>Delete</DeleteReview>
        </div>
      </StyledRow>
    );
  }
}

export default ReviewRow;
export { StyledClassRow };
