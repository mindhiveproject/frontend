import React, { Component } from 'react';
import ProposalWrapper from './proposalWrapper';
import ReviewDisplay from './reviews/reviewDisplay';

class ReviewsContainer extends Component {
  state = {
    page: 'proposal',
    review: null,
    reviewNumber: null,
  };

  selectReview = (review, reviewNumber) => {
    this.setState({
      page: 'review',
      review,
      reviewNumber,
    });
  };

  closeReview = () => {
    this.setState({
      page: 'proposal',
      review: null,
      reviewNumber: null,
    });
  };

  render() {
    if (this.state.page === 'proposal') {
      return (
        <ProposalWrapper
          proposals={this.props.proposals}
          onProposalChange={this.props.onProposalChange}
          proposal={this.props.proposal}
          study={this.props.study}
          user={this.props.user}
          selectReview={this.selectReview}
        />
      );
    }

    if (this.state.page === 'review') {
      return (
        <ReviewDisplay
          review={this.state.review}
          reviewNumber={this.state.reviewNumber}
          closeReview={this.closeReview}
        />
      );
    }
  }
}

export default ReviewsContainer;
