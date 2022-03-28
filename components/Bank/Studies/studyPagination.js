import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

const PAGINATION_STUDIES_QUERY = gql`
  query PAGINATION_STUDIES_QUERY {
    countStudies {
      aggregate {
        count
      }
    }
  }
`;

export const StyledPagination = styled.div`
  display: grid;
  align-self: end;
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 1rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  & > * {
    align-content: center;
    display: grid;
    margin: 0;
    padding: 15px 10px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
  .next {
    text-align: end;
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
