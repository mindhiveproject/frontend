import React, { Component } from 'react';

import { Mutation } from '@apollo/client/react/components';

import { Icon, Dropdown } from 'semantic-ui-react';
import ChecklistItem from './checklist/index';
import { checklistItems } from './checklist/checkTemplate';

// queries & mutations
import { PROPOSAL_REVIEWS_QUERY } from '../../Queries/Review';
import { UPDATE_PROPOSAL_BOARD } from '../../Mutations/Proposal';

import ReviewRow from './reviews/row';

import {
  StyledReviewSection,
  StyledReviewBoard,
  StyledReviewCard,
} from './styles';

class ProposalWrapper extends Component {
  state = {
    showAllReviews: false,
  };

  takeAction = action => {
    if (action === 'export') {
      this.exportProposal();
    }
  };

  exportProposal = () => {
    const url = `/proposals/${this.props.proposal?.slug}`;
    const win = window.open(url, '_blank');
  };

  submitProposal = async updateProposalMutation => {
    const res = await updateProposalMutation({
      variables: { id: this.props.proposal.id, isSubmitted: true },
    });
  };

  toggleCheckTo = async (name, newState, updateProposalMutation) => {
    let checklist;
    const prevCheckList = this.props.proposal?.checklist || [];
    if (newState) {
      checklist = [...prevCheckList, name];
    } else {
      checklist = [...prevCheckList.filter(item => item !== name)];
    }
    const res = await updateProposalMutation({
      variables: {
        id: this.props.proposal.id,
        checklist,
      },
    });
  };

  render() {
    const { proposal, proposals } = this.props;

    return (
      <Mutation
        mutation={UPDATE_PROPOSAL_BOARD}
        refetchQueries={[
          {
            query: PROPOSAL_REVIEWS_QUERY,
            variables: { id: this.props.proposal.id },
          },
        ]}
      >
        {(updateProposal, { loading, error }) => {
          if (error) {
            alert(`We have an error ${error}`);
          }
          return (
            <StyledReviewSection>
              <StyledReviewBoard>
                <StyledReviewCard className="submit">
                  <h2>
                    Ready to send for review{' '}
                    <Dropdown
                      inline
                      placeholder="Select proposal"
                      options={proposals.map(p => ({
                        key: p.id,
                        value: p.id,
                        text: p.title,
                      }))}
                      onChange={this.props.onProposalChange}
                      value={proposal?.id}
                      className="dropdown"
                    />
                    ?
                  </h2>

                  <div className="submitPanel">
                    <p>
                      When you submit your study as “ready for review,” your
                      proposal and study will become available to peer reviewers
                      from other participating schools to view and review.
                    </p>
                    <div className="submitBtnContainer">
                      <button
                        type="button"
                        style={{
                          display: 'grid',
                          gridGap: '15px',
                          gridTemplateColumns: '20px 1fr',
                          padding: '15px 20px 10px 20px',
                          background: `${
                            proposal?.isSubmitted ? '#FFF3CD' : '#FFFFFF'
                          }`,
                          border: `${
                            proposal?.isSubmitted
                              ? '2px solid #FFC107'
                              : '2px solid #B3B3B3'
                          }`,
                        }}
                        disabled={proposal?.isSubmitted}
                        onClick={() => {
                          if (
                            confirm(
                              'Are you sure you want to submit this proposal? You will not be able to undo it later.'
                            )
                          ) {
                            this.submitProposal(updateProposal);
                          }
                        }}
                      >
                        {proposal?.isSubmitted ? (
                          <Icon
                            name="check"
                            style={{
                              color: '#FFC107',
                            }}
                          />
                        ) : (
                          <img
                            src="/static/assets/submit-review.svg"
                            alt="icon"
                          />
                        )}

                        {proposal?.isSubmitted
                          ? 'Submitted for review'
                          : 'Submit for review'}
                      </button>
                    </div>
                  </div>
                </StyledReviewCard>

                <StyledReviewCard className="checklist">
                  <h2>Pre-review checklist</h2>

                  <p>Before you submit for review, make sure to:</p>

                  <div className="checklistItems">
                    {checklistItems.map((item, i) => (
                      <ChecklistItem
                        item={item}
                        key={i}
                        isComplete={this.props?.proposal?.checklist?.includes(
                          item.name
                        )}
                        toggleCheckTo={this.toggleCheckTo}
                        updateProposalMutation={updateProposal}
                        takeAction={this.takeAction}
                        isSubmitted={!!proposal?.isSubmitted}
                      />
                    ))}
                  </div>
                </StyledReviewCard>

                <StyledReviewCard className="reviews">
                  <h2>Reviews</h2>
                  {proposal?.reviews && proposal?.reviews.length ? (
                    <div className="reviewsCards">
                      <p>
                        All individual reviews and syntheses are available here:
                      </p>
                      {proposal.reviews
                        .filter(review => review.stage === 'SYNTHESIS')
                        .map((review, num) => (
                          <ReviewRow
                            key={num}
                            number={num + 1}
                            review={review}
                            stage="SYNTHESIS"
                            selectReview={this.props.selectReview}
                          />
                        ))}

                      <a
                        className="allReviewsToggle"
                        onClick={() =>
                          this.setState({
                            showAllReviews: !this.state.showAllReviews,
                          })
                        }
                      >
                        {this.state.showAllReviews ? 'Hide' : 'Show'} all
                        reviews
                      </a>

                      {this.state.showAllReviews && (
                        <>
                          {proposal.reviews
                            .filter(review => review.stage === 'INDIVIDUAL')
                            .map((review, num) => (
                              <ReviewRow
                                key={num}
                                number={num + 1}
                                review={review}
                                stage="INDIVIDUAL"
                                selectReview={this.props.selectReview}
                              />
                            ))}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="reviewsPlaceholder">
                      <p>
                        <strong>You don’t have any reviews yet</strong>
                      </p>
                      <p>
                        Once you mark your study as ready for review and your
                        peers have reviewed and synthesized their comments, you
                        will see your reviews here.
                      </p>
                    </div>
                  )}
                </StyledReviewCard>
              </StyledReviewBoard>
            </StyledReviewSection>
          );
        }}
      </Mutation>
    );
  }
}

export default ProposalWrapper;
