import React, { Component } from 'react';

import moment from 'moment';
import DeleteProposal from './deleteProposal';

import {
  StyledEmptyProposalOverview,
  StyledProposalOverview,
  StyledRow,
  StyledProposalHeader,
  StyledItemRow,
} from './styles';

class Overview extends Component {
  render() {
    const proposals = this.props?.proposals || [];

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
                    {!prop?.isSubmitted && (
                      <DeleteProposal
                        proposalId={prop?.id}
                        studyId={this.props.study?.id}
                      >
                        <button>Delete</button>
                      </DeleteProposal>
                    )}
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
