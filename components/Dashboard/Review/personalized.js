import React, { Component } from 'react';

import Reviews from './reviews';
import ReviewPage from './reviewpage';

import AuthorizedPage from '../../Page/userpage';

class DashboardReview extends Component {
  state = {
    page: this.props.page || 'reviews',
    review: null,
  };

  addReview = () => {
    this.setState({
      page: 'addreview',
    });
  };

  openReview = review => {
    this.setState({
      page: 'reviewpage',
      review,
    });
  };

  goBack = () => {
    this.setState({
      page: 'reviews',
      review: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'reviews') {
      return (
        <AuthorizedPage>
          <Reviews addReview={this.addReview} openReview={this.openReview} />
        </AuthorizedPage>
      );
    }

    if (page === 'reviewpage') {
      return <ReviewPage review={this.state.review} goBack={this.goBack} />;
    }
  }
}

export default DashboardReview;
