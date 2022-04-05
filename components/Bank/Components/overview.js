import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import debounce from 'lodash.debounce';
import { StyledBank, StyledZeroState } from '../styles';
import Card from './card';

import PaginationComponents from '../../Pagination/allComponents';
import { StyledOverview } from '../Studies/overview';

const OVERVIEW_COMPONENTS_QUERY = gql`
  query OVERVIEW_COMPONENTS_QUERY(
    $taskType: TaskType
    $skip: Int
    $first: Int
    $search: String
  ) {
    allTasks(
      where: { taskType: $taskType, title_contains: $search }
      skip: $skip
      first: $first
    ) {
      id
      title
      slug
      description
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      taskType
      submitForPublishing
    }
  }
`;

class OverviewComponentsBank extends Component {
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
    const { componentType } = this.props;
    const component = componentType.toLowerCase();

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
          query={OVERVIEW_COMPONENTS_QUERY}
          variables={{
            taskType: componentType,
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
            search: this.state.search,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const tasks = data.allTasks;
            if (tasks.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't developed a {component} yet.</h2>
                    <p>
                      Once you develop your {component} first, it will appear
                      here.
                    </p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <div className="studies">
                  {tasks.map(component => (
                    <Card
                      key={component.id}
                      component={component}
                      onSelectComponent={this.props.onSelectComponent}
                      user={this.props.user}
                      overviewMode
                      developingMode
                    />
                  ))}
                </div>
                <PaginationComponents
                  componentType={componentType}
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

export default OverviewComponentsBank;
export { OVERVIEW_COMPONENTS_QUERY };
