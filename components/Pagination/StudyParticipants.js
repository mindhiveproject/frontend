import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledPagination } from './styles';

const PAGINATION_USERS_QUERY = gql`
  query PAGINATION_USERS_QUERY($search: String, $studyId: ID!) {
    countStudyParticipants(
      where: {
        participantIn_some: { id: $studyId }
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
    const { perPage, page, search, studyId } = this.props;
    return (
      <Query query={PAGINATION_USERS_QUERY} variables={{ search, studyId }}>
        {({ data, error, loading }) => {
          if (error) return <p>Error: {error.message}</p>;
          const countStudyParticipants = loading
            ? 0
            : data?.countStudyParticipants?.aggregate?.count;
          const pageCount = loading
            ? 1
            : Math.ceil(countStudyParticipants / perPage);
          return (
            <StyledPagination>
              <div
                onClick={() => {
                  if (page > 1) this.props.changeToPage('page', page - 1);
                }}
              >
                <a aria-disabled={page <= 1}>Prev</a>
              </div>
              <p>
                Page {page} of {pageCount}{' '}
              </p>
              <p>{countStudyParticipants} participants total</p>
              <div
                onClick={() => {
                  if (page < pageCount)
                    this.props.changeToPage('page', page + 1);
                }}
              >
                <a aria-disabled={page >= pageCount} className="next">
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
