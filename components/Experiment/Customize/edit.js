import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CUSTOM_PARAMETER_QUERY } from '../CustomRun/index';

import ParametersUpdateForm from './parametersUpdateForm';

class EditParameter extends Component {
  render() {
    return (
      <Query query={CUSTOM_PARAMETER_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.parameter)
            return <p>No parameters found for id {this.props.id}</p>;
          return (
            <ParametersUpdateForm
              parameters={data.parameter.data}
              title={data.parameter.title}
              id={this.props.id}
            />
          );
        }}
      </Query>
    );
  }
}

export default EditParameter;
