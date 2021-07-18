import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DeleteProposal from './deleteProposal';

const StyledEmptyProposalOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  align-content: center;
  justify-content: center;
  text-align: center;
  button {
    max-width: 100%;
  }
`;

const StyledProposalOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin: 3rem;
  align-content: baseline;
  .navigationHeader {
    display: grid;
    justify-content: end;
  }
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  align-items: center;
`;

const StyledProposalHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

const StyledItemRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  align-items: center;
  .actionLinks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
`;

class Overview extends Component {
  render() {
    const proposals = this.props?.study?.proposal;

    if (proposals.length === 0) {
      return (
        <StyledEmptyProposalOverview>
          <h3>You haven’t created any proposals yet.</h3>
          <p>Once you create a proposal, it will appear here.</p>

          <button onClick={() => this.props.createProposal()}>
            Create a new proposal
          </button>
        </StyledEmptyProposalOverview>
      );
    }

    return (
      <StyledProposalOverview>
        <div className="navigationHeader">
          <div></div>
          <div>
            <button onClick={() => this.props.createProposal()}>
              Create a new proposal
            </button>
          </div>
        </div>

        <div>
          <StyledRow>
            <StyledProposalHeader>
              <div>Proposal name</div>
              <div>Date created</div>
              <div>Status</div>
              <div>Actions</div>
            </StyledProposalHeader>
            <div></div>
          </StyledRow>
          {proposals.map(prop => (
            <div key={prop?.id}>
              <StyledRow>
                <StyledItemRow>
                  <div>
                    <p>{prop?.title}</p>
                  </div>
                  <div>
                    <p>{moment(prop?.createdAt).format('MMMM D, YYYY')}</p>
                  </div>
                  <div>
                    <p>{prop?.isSubmitted ? 'Submitted' : 'Not submitted'}</p>
                  </div>

                  <div className="actionLinks">
                    <button onClick={() => this.props.openProposal(prop?.id)}>
                      Open
                    </button>
                    <button onClick={() => this.props.copyProposal(prop?.id)}>
                      Copy
                    </button>
                    <DeleteProposal
                      proposalId={prop?.id}
                      studyId={this.props.study?.id}
                    >
                      <button>Delete</button>
                    </DeleteProposal>
                  </div>
                </StyledItemRow>
              </StyledRow>
            </div>
          ))}
        </div>
      </StyledProposalOverview>
    );
  }
}

export default Overview;
