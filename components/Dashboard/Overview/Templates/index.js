import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import debounce from 'lodash.debounce';
import { StyledBank, StyledZeroState, StyledOverview } from './styles';
import Card from './card';

import PaginationTemplates from '../../../Pagination/allTemplates';

import { OVERVIEW_TEMPLATES_QUERY } from '../../../Queries/Template';

class OverviewTemplates extends Component {
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
    const perPage = 36;

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
          query={OVERVIEW_TEMPLATES_QUERY}
          variables={{
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
            search: this.state.search,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { templates } = data;

            if (templates.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't developed a template yet.</h2>
                    <p>
                      Once you develop your template first, it will appear here.
                    </p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <div className="studies">
                  {templates.map(template => (
                    <Card
                      key={template.id}
                      template={template}
                      onSelectTemplate={this.props.onSelectTemplate}
                      user={this.props.user}
                    />
                  ))}
                </div>
                <PaginationTemplates
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

export default OverviewTemplates;
