import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import styled from "styled-components";
import ReviewLine from "./ReviewBoard/line";

import { PROPOSALS_FOR_REVIEW_QUERY } from "../../Queries/Proposal";

const StyledReviewHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: 300px 200px 120px 120px 200px;
  grid-gap: 5px;
  font-weight: bold;
  .centered {
    text-align: center;
  }
`;

class Reviews extends Component {
  render() {
    return (
      <Query
        query={PROPOSALS_FOR_REVIEW_QUERY}
        variables={{ classes: this.props.networkClassIds }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { proposalsForReview } = data;

          if (proposalsForReview.length === 0) {
            return (
              <>
                <h3>There are no studies to review yet.</h3>
                <p>
                  Once there will be a study to review, it will appear here.
                </p>
                <div className="navigationHeader"></div>
              </>
            );
          }
          return (
            <>
              <div className="navigationHeader"></div>

              <StyledReviewHeader>
                <div>Study title</div>
                <div>Class</div>
                <div className="centered">Submitted</div>
                <div className="centered">Reviews</div>
                <div>Actions</div>
              </StyledReviewHeader>

              {proposalsForReview.map((proposal) => (
                <ReviewLine
                  proposal={proposal}
                  key={proposal.id}
                  openReview={this.props.openReview}
                  openSynthesize={this.props.openSynthesize}
                />
              ))}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Reviews;
