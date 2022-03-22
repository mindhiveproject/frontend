import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/client/react/components';
import SingleQuestion from './singleQuestion';
import { PROPOSALS_FOR_REVIEW_QUERY } from '../reviews';

import { individualQuestions, synthesisQuestions } from './reviewQuestions';

const StyledReviewQuestions = styled.div`
  display: grid;
  .reviewItems {
    display: grid;
    grid-gap: 20px;
    margin-bottom: 40px;
  }
  h1 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
  }
  h2 {
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 700, Bold;
    line-height: 24px;
    margin-bottom: 0;
  }
  p {
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
  button {
    background: #007c70;
    border: 2px solid #007c70;
    box-sizing: border-box;
    border-radius: 4px;
    width: 140px;
    padding: 14px 24px;
    color: #ffffff;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;
    text-align: center;
    cursor: pointer;
  }
  textarea {
    padding: 0.5rem;
    width: 100%;
    height: 150px;
    background: #ffffff;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

// TODO write query to get a review (if there is any)
const GET_REVIEW_QUERY = gql`
  query GET_REVIEW_QUERY(
    $studyId: ID
    $proposalId: ID
    $authorId: ID
    $stage: ReviewStage
  ) {
    reviews(
      where: {
        study: { id: $studyId }
        proposal: { id: $proposalId }
        author: { id: $authorId }
        stage: $stage
      }
    ) {
      id
      stage
      settings
      content
    }
  }
`;

// TODO write mutation to create a review
const CREATE_NEW_REVIEW = gql`
  mutation CREATE_NEW_REVIEW(
    $studyId: ID!
    $proposalId: ID!
    $stage: ReviewStage
    $settings: Json
    $content: Json
  ) {
    createReview(
      studyId: $studyId
      proposalId: $proposalId
      stage: $stage
      settings: $settings
      content: $content
    ) {
      id
    }
  }
`;

// write update mutation for a review
const UPDATE_REVIEW = gql`
  mutation UPDATE_REVIEW(
    $id: ID!
    $stage: ReviewStage
    $settings: Json
    $content: Json
  ) {
    updateReview(
      id: $id
      stage: $stage
      settings: $settings
      content: $content
    ) {
      id
    }
  }
`;

class ReviewQuestionsWrapper extends Component {
  render() {
    return (
      <Query
        query={GET_REVIEW_QUERY}
        variables={{
          studyId: this.props.studyId,
          proposalId: this.props.proposalId,
          authorId: this.props.authorId,
          stage: this.props.stage,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          const review = data.reviews.length && data.reviews[0];
          return (
            <>
              <ReviewQuestions
                content={
                  review?.content ||
                  (this.props.stage === 'INDIVIDUAL'
                    ? individualQuestions
                    : synthesisQuestions)
                }
                studyId={this.props.studyId}
                proposalId={this.props.proposalId}
                authorId={this.props.authorId}
                goBack={this.props.goBack}
                reviewId={review?.id}
                tab={this.props.tab}
                stage={this.props.stage}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

export default ReviewQuestionsWrapper;

class ReviewQuestions extends Component {
  state = {
    content: [...this.props.content],
    studyId: this.props.studyId,
    proposalId: this.props.proposalId,
    id: this.props.reviewId,
    stage: this.props.stage,
  };

  handleChange = e => {
    const { id, value, className, name } = e.target;
    const updatedContent = [...this.state.content];
    const content = updatedContent.map(item => {
      if (item.name === name) {
        const updatedItem = { ...item };
        updatedItem[className] = value;
        return updatedItem;
      }
      return item;
    });

    this.setState({
      content,
    });
  };

  uploadReview = async reviewMutation => {
    const res = await reviewMutation();
    this.props.goBack();
  };

  render() {
    return (
      <StyledReviewQuestions>
        <>
          <h1>Synthesis questions</h1>
          <div className="reviewItems">
            {this.state.content.map((item, i) => (
              <SingleQuestion
                key={i}
                item={item}
                handleChange={this.handleChange}
                handleRatingChange={this.handleRatingChange}
                stage={this.state.stage}
              />
            ))}
          </div>

          {this.state.id ? (
            <Mutation
              mutation={UPDATE_REVIEW}
              variables={this.state}
              refetchQueries={[
                {
                  query: GET_REVIEW_QUERY,
                  variables: {
                    studyId: this.state.studyId,
                    proposalId: this.state.proposalId,
                    authorId: this.state.authorId,
                    stage: this.state.stage,
                  },
                },
              ]}
            >
              {(updateReviewMutation, { loading, error }) => (
                <>
                  {loading ? (
                    <p>Updating ...</p>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => this.uploadReview(updateReviewMutation)}
                    >
                      Update
                    </button>
                  )}
                </>
              )}
            </Mutation>
          ) : (
            <Mutation
              mutation={CREATE_NEW_REVIEW}
              variables={this.state}
              refetchQueries={[
                {
                  query: GET_REVIEW_QUERY,
                  variables: {
                    studyId: this.props.studyId,
                    proposalId: this.props.proposalId,
                    authorId: this.props.authorId,
                    stage: this.props.stage,
                  },
                },
                {
                  query: PROPOSALS_FOR_REVIEW_QUERY,
                  variables: { classes: this.props.networkClassIds },
                },
              ]}
            >
              {(createReviewMutation, { loading, error }) => (
                <>
                  {loading ? (
                    <p>Uploading ...</p>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => this.uploadReview(createReviewMutation)}
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </Mutation>
          )}
        </>
      </StyledReviewQuestions>
    );
  }
}
