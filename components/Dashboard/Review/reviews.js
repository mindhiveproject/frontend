import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import ReviewLine from './ReviewBoard/line';
import { StyledDasboard, StyledClassesDasboard } from '../styles';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledReviewHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: 4fr 2fr 1fr 2fr;
  cursor: pointer;
  font-weight: bold;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const PROPOSALS_FOR_REVIEW_QUERY = gql`
  query PROPOSALS_FOR_REVIEW_QUERY($classes: [ID!]) {
    proposalsForReview(where: { id_in: $classes }) {
      id
      slug
      title
      createdAt
      isSubmitted
      reviews {
        id
        stage
      }
      study {
        title
      }
      author {
        id
        studentIn {
          id
          title
        }
        teacherIn {
          id
          title
        }
      }
    }
  }
`;

class Reviews extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>Review your peers' studies</h1>

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
                  <div>
                    <StyledRow>
                      <StyledReviewHeader>
                        <div>Study title</div>
                        <div>Class</div>
                        <div>Reviews</div>
                        <div>Actions</div>
                      </StyledReviewHeader>
                      <div></div>
                    </StyledRow>

                    {proposalsForReview.map(proposal => (
                      <ReviewLine
                        proposal={proposal}
                        key={proposal.id}
                        openReview={this.props.openReview}
                        openSynthesize={this.props.openSynthesize}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default Reviews;
export { PROPOSALS_FOR_REVIEW_QUERY };
