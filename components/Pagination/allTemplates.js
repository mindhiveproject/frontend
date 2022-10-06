import React, { Component } from 'react';

import Link from 'next/link';
import { Query } from '@apollo/client/react/components';

import { StyledPagination } from './styles';

import { PAGINATION_TEMPLATES_QUERY } from '../Queries/Template';

class PaginationStudies extends Component {
  render() {
    const { perPage, pagination, search } = this.props;

    return (
      <Query query={PAGINATION_TEMPLATES_QUERY} variables={{ search }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const countTemplates = data?.countTemplates?.aggregate?.count;
          const pageCount = Math.ceil(countTemplates / perPage);
          const page = pagination || 1;
          return (
            <StyledPagination>
              <Link href={`/dashboard/overview/templates/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
              </Link>
              <p>
                Page {page} of {pageCount}{' '}
              </p>
              <p>{countTemplates} templates total</p>
              <Link href={`/dashboard/overview/templates/${page + 1}`}>
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
