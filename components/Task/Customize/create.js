import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import CreateTaskForm from './createTaskForm';

const TEMPLATE_QUERY = gql`
  query TEMPLATE_QUERY($id: ID!) {
    template(where: { id: $id }) {
      id
      title
      description
      parameters
      script
      style
    }
  }
`;

class CreateTask extends Component {
  render() {
    return (
      <Query query={TEMPLATE_QUERY} variables={{ id: this.props.template }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.template)
            return <p>No task template found for id {this.props.template}</p>;
          return <CreateTaskForm template={data.template} />;
        }}
      </Query>
    );
  }
}

export default CreateTask;
