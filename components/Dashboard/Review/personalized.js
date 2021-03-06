import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Reviews from './reviews';
import Review from './ReviewBoard/review';
import AuthorizedPage from '../../Page/userpage';
import EmptyPage from '../../Page/empty';
import Error from '../../ErrorMessage/index';

import { USER_CLASSES_QUERY } from '../../User/index';

class DashboardReview extends Component {
  state = {
    page: this.props.page || 'proposalsPage',
    proposalId: null,
  };

  openReview = proposalId => {
    this.setState({
      page: 'reviewPage',
      proposalId,
    });
  };

  openSynthesize = proposalId => {
    this.setState({
      page: 'synthesizePage',
      proposalId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'proposalsPage',
      proposalId: null,
    });
  };

  render() {
    const { page } = this.state;

    return (
      <Query query={USER_CLASSES_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayloadError} />;
          if (userPayloadLoading) return <p>Loading</p>;
          const myClasses =
            [...userPayloadData?.studentIn, ...userPayloadData?.teacherIn] ||
            [];
          const networkClassIds =
            myClasses
              .map(myClass =>
                myClass?.network?.classes.map(theClass => theClass?.id)
              )
              .flat() || [];
          return (
            <>
              {page === 'proposalsPage' && (
                <AuthorizedPage>
                  <Reviews
                    openReview={this.openReview}
                    openSynthesize={this.openSynthesize}
                    networkClassIds={networkClassIds}
                  />
                </AuthorizedPage>
              )}

              {page === 'reviewPage' && (
                <EmptyPage>
                  <Review
                    proposalId={this.state.proposalId}
                    goBack={this.goBack}
                    networkClassIds={networkClassIds}
                    stage="INDIVIDUAL"
                  />
                </EmptyPage>
              )}

              {page === 'synthesizePage' && (
                <EmptyPage>
                  <Review
                    proposalId={this.state.proposalId}
                    goBack={this.goBack}
                    networkClassIds={networkClassIds}
                    stage="SYNTHESIS"
                    tab="reviews"
                  />
                </EmptyPage>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default DashboardReview;
