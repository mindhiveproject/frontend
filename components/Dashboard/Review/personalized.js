import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import Reviews from './reviews';
import Review from './ReviewBoard/review';
import AuthorizedPage from '../../Page/userpage';
import EmptyPage from '../../Page/empty';
import Error from '../../ErrorMessage/index';
import ReviewsWrapper from './reviewsWrapper';

import { USER_CLASSES_QUERY } from '../../User/index';

class DashboardReview extends Component {
  state = {
    page: this.props.page || 'reviewsWrapper',
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
      page: 'reviewsWrapper',
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
            [
              ...userPayloadData?.studentIn,
              ...userPayloadData?.teacherIn,
              ...userPayloadData?.mentorIn,
            ] || [];

          const networkClasses =
            myClasses
              .map(myClass => {
                if (myClass?.network) {
                  return myClass?.network?.map(net => net.classes).flat();
                }
                return [];
              })
              .flat() || [];
          const allClasses = [...myClasses, ...networkClasses];
          const allClassIds = allClasses.map(theclass => theclass.id);
          const allUniqueClassIds = [...new Set([...allClassIds])];
          const allUniqueClasses = allUniqueClassIds.map(id => ({
            id,
            title: allClasses.filter(c => c.id === id).map(c => c.title)[0],
          }));

          return (
            <>
              {page === 'reviewsWrapper' && (
                <AuthorizedPage>
                  <ReviewsWrapper
                    openReview={this.openReview}
                    openSynthesize={this.openSynthesize}
                    goBack={this.goBack}
                    classes={allUniqueClasses}
                  />
                </AuthorizedPage>
              )}

              {page === 'proposalsPage' && (
                <AuthorizedPage>
                  <Reviews
                    openReview={this.openReview}
                    openSynthesize={this.openSynthesize}
                    networkClassIds={allClassIds}
                  />
                </AuthorizedPage>
              )}

              {page === 'reviewPage' && (
                <EmptyPage>
                  <Review
                    proposalId={this.state.proposalId}
                    goBack={this.goBack}
                    networkClassIds={allClassIds}
                    stage="INDIVIDUAL"
                  />
                </EmptyPage>
              )}

              {page === 'synthesizePage' && (
                <EmptyPage>
                  <Review
                    proposalId={this.state.proposalId}
                    goBack={this.goBack}
                    networkClassIds={allClassIds}
                    stage="SYNTHESIS"
                    tab="reviews"
                    user={this.props.user}
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
