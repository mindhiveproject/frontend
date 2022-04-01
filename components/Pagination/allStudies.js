import React, { Component } from 'react';

import Link from 'next/link';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledPagination } from './styles';

const PAGINATION_STUDIES_QUERY = gql`
  query PAGINATION_STUDIES_QUERY {
    countStudies {
      aggregate {
        count
      }
    }
  }
`;

class PaginationStudies extends Component {
  render() {
    const { perPage, pagination } = this.props;
    return (
      <Query query={PAGINATION_STUDIES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const studiesCount = data?.countStudies?.aggregate?.count;
          const pageCount = Math.ceil(studiesCount / perPage);
          const page = pagination || 1;
          return (
            <StyledPagination>
              <Link href={`/dashboard/overview/studies/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
              </Link>
              <p>
                Page {page} of {pageCount}{' '}
              </p>
              <p>{studiesCount} studies total</p>
              <Link href={`/dashboard/overview/studies/${page + 1}`}>
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
