import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledPagination } from './styles';

const PAGINATION_GUEST_PARTICIPANTS_QUERY = gql`
  query PAGINATION_GUEST_PARTICIPANTS_QUERY($search: String, $studyId: ID!) {
    countStudyGuestParticipants(
      where: {
        guestParticipantIn_some: { id: $studyId }
        OR: [
          { publicId_contains: $search }
          { publicReadableId_contains: $search }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

class PaginationStudyParticipants extends Component {
  render() {
    const { perPage, guestPage, search, studyId } = this.props;
    return (
      <Query
        query={PAGINATION_GUEST_PARTICIPANTS_QUERY}
        variables={{ search, studyId }}
      >
        {({ data, error, loading }) => {
          if (error) return <p>Error: {error.message}</p>;
          const countStudyGuestParticipants = loading
            ? 0
            : data?.countStudyGuestParticipants?.aggregate?.count;
          const pageCount = loading
            ? 1
            : Math.ceil(countStudyGuestParticipants / perPage);
          return (
            <StyledPagination>
              <div
                onClick={() => {
                  if (guestPage > 1)
                    this.props.changeToPage('guestPage', guestPage - 1);
                }}
              >
                <a aria-disabled={guestPage <= 1}>Prev</a>
              </div>
              <p>
                Page {guestPage} of {pageCount}{' '}
              </p>
              <p>{countStudyGuestParticipants} guest participants total</p>
              <div
                onClick={() => {
                  if (guestPage < pageCount)
                    this.props.changeToPage('guestPage', guestPage + 1);
                }}
              >
                <a aria-disabled={guestPage >= pageCount} className="next">
                  Next
                </a>
              </div>
            </StyledPagination>
          );
        }}
      </Query>
    );
  }
}

export default PaginationStudyParticipants;
