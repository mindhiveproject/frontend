import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledBank, StyledStudyCard, StyledZeroState } from '../styles';
import Card from './card';

import PaginationComponents from '../../Pagination/allComponents';

const OVERVIEW_COMPONENTS_QUERY = gql`
  query OVERVIEW_COMPONENTS_QUERY(
    $taskType: TaskType
    $skip: Int
    $first: Int
  ) {
    allTasks(where: { taskType: $taskType }, skip: $skip, first: $first) {
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
  render() {
    const perPage = 9;
    const { componentType } = this.props;
    const component = componentType.toLowerCase();

    return (
      <>
        <Query
          query={OVERVIEW_COMPONENTS_QUERY}
          variables={{
            taskType: componentType,
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
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
                <PaginationComponents
                  componentType={componentType}
                  pagination={this.props.pagination}
                  perPage={perPage}
                />
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
              </StyledBank>
            );
          }}
        </Query>
      </>
    );
  }
}

export default OverviewComponentsBank;
export { OVERVIEW_COMPONENTS_QUERY };
