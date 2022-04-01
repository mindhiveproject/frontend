import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledBank, StyledZeroState } from '../styles';
import StudyCard from './studycard';

import PaginationStudies from '../../Pagination/allStudies';

const OVERVIEW_STUDIES_QUERY = gql`
  query OVERVIEW_STUDIES_QUERY($skip: Int, $first: Int) {
    allStudies(skip: $skip, first: $first) {
      id
      title
      slug
      image
      author {
        id
        permissions
      }
      collaborators {
        id
        username
        permissions
      }
      participants {
        id
      }
      public
      featured
      shortDescription
      submitForPublishing
    }
  }
`;

class OverviewStudiesBank extends Component {
  render() {
    const perPage = 9;
    return (
      <>
        <Query
          query={OVERVIEW_STUDIES_QUERY}
          variables={{
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const studies = data.allStudies;
            if (studies.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>There is no study on the platform yet.</h2>
                    <p>Once there will be a study, it will appear here.</p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <PaginationStudies
                  pagination={this.props.pagination}
                  perPage={perPage}
                />
                <div className="studies">
                  {studies.map(study => (
                    <StudyCard
                      key={study.id}
                      study={study}
                      onSelectStudy={this.props.onSelectStudy}
                      user={this.props.user}
                      overviewMode
                    />
                  ))}
                </div>
              </StyledBank>
            );
          }}
        </Query>
      </>
    );
  }
}

export default OverviewStudiesBank;
export { OVERVIEW_STUDIES_QUERY };
