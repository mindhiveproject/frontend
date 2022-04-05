import React, { Component } from 'react';

import Link from 'next/link';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledPagination } from './styles';

const PAGINATION_COMPONENTS_QUERY = gql`
  query PAGINATION_COMPONENTS_QUERY($componentType: TaskType, $search: String) {
    countComponents(
      where: { taskType: $componentType, title_contains: $search }
    ) {
      aggregate {
        count
      }
    }
  }
`;

class PaginationStudies extends Component {
  render() {
    const { componentType, perPage, pagination, search } = this.props;
    const componentName = `${componentType.toLowerCase()}s`;

    return (
      <Query
        query={PAGINATION_COMPONENTS_QUERY}
        variables={{ componentType, search }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const countComponents = data?.countComponents?.aggregate?.count;
          const pageCount = Math.ceil(countComponents / perPage);
          const page = pagination || 1;
          return (
            <StyledPagination>
              <Link href={`/dashboard/overview/${componentName}/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
              </Link>
              <p>
                Page {page} of {pageCount}{' '}
              </p>
              <p>
                {countComponents} {componentName} total
              </p>
              <Link href={`/dashboard/overview/${componentName}/${page + 1}`}>
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
