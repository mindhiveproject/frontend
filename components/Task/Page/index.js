import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import TaskPage from './page';

import { StyledTask } from '../styles';

const REVIEW_TASK_QUERY = gql`
  query REVIEW_TASK_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      description
      parameters
      template {
        id
      }
    }
  }
`;

class ReviewTask extends Component {
  render() {
    return (
      <Query query={REVIEW_TASK_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No task found for {this.props.id}</p>;
          const { task } = data;
          return <TaskPage task={task} />;
        }}
      </Query>
    );
  }
}

export default ReviewTask;
export { REVIEW_TASK_QUERY };
