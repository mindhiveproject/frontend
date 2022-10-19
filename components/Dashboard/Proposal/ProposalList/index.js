import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DeleteProposal from './deleteProposal';

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
  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }
`;

class ProposalRow extends Component {
  render() {
    const { myproposal } = this.props;
    return (
      <StyledRow>
        <StyledClassRow onClick={() => this.props.openProposal(myproposal)}>
          <div>{myproposal?.title}</div>
          <div>{myproposal?.sections?.length}</div>
          <div>{moment(myproposal?.createdAt).format('MMMM D, YYYY')}</div>
          <div>{myproposal?.isTemplate ? 'Yes' : 'No'}</div>
        </StyledClassRow>
        <div className="deleteBtn">
          <DeleteProposal proposalId={myproposal.id}>Delete</DeleteProposal>
        </div>
      </StyledRow>
    );
  }
}

export default ProposalRow;
export { StyledClassRow };
