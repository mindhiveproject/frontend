import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { parameters_rating } from '../../Labjs/protocols/rating';
import { parameters_risktaking } from '../../Labjs/protocols/risktaking';
import ParametersCreateForm from './parametersCreateForm';

const EXPERIMENT_DEFAULT_PARAMETER_QUERY = gql`
  query EXPERIMENT_DEFAULT_PARAMETER_QUERY($id: ID!) {
    experiment(where: { id: $id }) {
      id
      title
      description
      parameters
    }
  }
`;

class CreateParameter extends Component {
  render() {
    return (
      <Query
        query={EXPERIMENT_DEFAULT_PARAMETER_QUERY}
        variables={{ id: this.props.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.experiment)
            return <p>No experiment found for id {this.props.id}</p>;
          console.log('experiment', data);
          return (
            <ParametersCreateForm
              parameters={data.experiment.parameters}
              title={data.experiment.title}
              id={this.props.id}
              experiment={data.experiment}
            />
          );
        }}
      </Query>
    );
  }
}

export default CreateParameter;
