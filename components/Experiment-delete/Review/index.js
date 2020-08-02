import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import ExperimentPage from '../../ExperimentPage/index';

import { StyledExperiment } from './styles';

const REVIEW_EXPERIMENT_QUERY = gql`
  query REVIEW_EXPERIMENT_QUERY($id: ID!) {
    experiment(where: { id: $id }) {
      id
      title
      description
      largeImage
      parameters
      script
      style
      customExperiments {
        id
        title
        author {
          id
          username
        }
        createdAt
        updatedAt
        settings
      }
    }
  }
`;

class ReviewExperiment extends Component {
  render() {
    return (
      <Query query={REVIEW_EXPERIMENT_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.experiment)
            return <p>No experiment found for {this.props.id}</p>;
          const exp = data.experiment;
          return <ExperimentPage exp={exp} />;
        }}
      </Query>
    );
  }
}

export default ReviewExperiment;
export { REVIEW_EXPERIMENT_QUERY };
