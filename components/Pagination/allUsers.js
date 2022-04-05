import React, { Component } from 'react';

import Link from 'next/link';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledPagination } from './styles';

const PAGINATION_USERS_QUERY = gql`
  query PAGINATION_USERS_QUERY($search: String) {
    countUsers(
      where: {
        OR: [
          { username_contains: $search }
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

class PaginationStudies extends Component {
  render() {
    const { perPage, pagination, search } = this.props;
    return (
      <Query query={PAGINATION_USERS_QUERY} variables={{ search }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const countUsers = data?.countUsers?.aggregate?.count;
          const pageCount = Math.ceil(countUsers / perPage);
          const page = pagination || 1;
          return (
            <StyledPagination>
              <Link href={`/dashboard/overview/users/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
              </Link>
              <p>
                Page {page} of {pageCount}{' '}
              </p>
              <p>{countUsers} users total</p>
              <Link href={`/dashboard/overview/users/${page + 1}`}>
                <a aria-disabled={page >= pageCount} className="next">
                  Next
                </a>
              </Link>
            </StyledPagination>
          );
        }}
      </Query>
    );
  }
}

export default PaginationStudies;
