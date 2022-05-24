import { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import debounce from 'lodash.debounce';
import { StyledBank, StyledZeroState } from '../styles';
import StudyCard from './studycard';

import PaginationStudies from '../../Pagination/allStudies';

export const StyledOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  .searchArea {
    display: grid;
    justify-content: start;
    align-items: center;
    span {
      font-size: 18px;
    }
    input {
      font-family: Lato;
      border: 1px solid #cccccc;
      border-radius: 4px;
      width: 100%;
      font-size: 20px;
      padding: 12px;
      &:focus {
        outline: 0;
        border-color: ${props => props.theme.red};
      }
    }
  }
`;

const OVERVIEW_STUDIES_QUERY = gql`
  query OVERVIEW_STUDIES_QUERY($skip: Int, $first: Int, $search: String) {
    allStudies(
      skip: $skip
      first: $first
      where: { OR: [{ title_contains: $search }, { slug_contains: $search }] }
    ) {
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
      guests {
        id
      }
      public
      featured
      shortDescription
      submitForPublishing
      isHidden
    }
  }
`;

class OverviewStudiesBank extends Component {
  state = {
    keyword: '',
    search: '',
  };

  debouncedSearch = debounce(value => {
    this.setState({
      search: value,
    });
  }, 1000);

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.debouncedSearch(e.target.value);
  };

  render() {
    const perPage = 12;
    return (
      <StyledOverview>
        <div className="searchArea">
          <span>Search</span>
          <input
            type="text"
            name="keyword"
            value={this.state.keyword}
            onChange={this.saveToState}
          />
        </div>
        <Query
          query={OVERVIEW_STUDIES_QUERY}
          variables={{
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
            search: this.state.search,
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
                <PaginationStudies
                  pagination={this.props.pagination}
                  perPage={perPage}
                  search={this.state.search}
                />
              </StyledBank>
            );
          }}
        </Query>
      </StyledOverview>
    );
  }
}

export default OverviewStudiesBank;
export { OVERVIEW_STUDIES_QUERY };
