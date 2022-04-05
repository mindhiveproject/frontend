import React, { Component } from 'react';

import Link from 'next/link';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledPagination } from './styles';

const PAGINATION_CLASSES_QUERY = gql`
  query PAGINATION_CLASSES_QUERY($search: String) {
    countClasses(where: { title_contains: $search }) {
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
      <Query query={PAGINATION_CLASSES_QUERY} variables={{ search }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const countClasses = data?.countClasses?.aggregate?.count;
          const pageCount = Math.ceil(countClasses / perPage);
          const page = pagination || 1;
          return (
            <StyledPagination>
              <Link href={`/dashboard/overview/classes/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
              </Link>
              <p>
                Page {page} of {pageCount}{' '}
              </p>
              <p>{countClasses} classes total</p>
              <Link href={`/dashboard/overview/classes/${page + 1}`}>
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
