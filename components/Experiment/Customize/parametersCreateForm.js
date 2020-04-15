import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';
import Router from 'next/router';
import { MY_PARAMETERS_QUERY } from '../../Experiments/Custom/my';
import { ALL_PARAMETERS_QUERY } from '../../Experiments/Custom/index';
import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';

import Error from '../../ErrorMessage/index';
import ParameterForm from './parameterForm';

const CREATE_PARAMETER = gql`
  mutation CREATE_PARAMETER($title: String!, $experimentId: ID!, $data: Json) {
    createParameter(title: $title, experimentId: $experimentId, data: $data) {
      id
      title
    }
  }
`;

class ParametersCreateForm extends Component {
  state = {
    title: this.props.title,
    data: this.props.parameters,
    id: this.props.id,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  handleParamChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      data: this.state.data.map(el =>
        el.name === name ? { ...el, value: val } : el
      ),
    });
  };

  createParameter = async (e, createParameterMutation) => {
    e.preventDefault();
    const res = await createParameterMutation({
      variables: {
        experimentId: this.props.id,
        ...this.state,
      },
    });
    // change the page
    Router.push({
      pathname: '/bank/mycustom',
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_PARAMETER}
        variables={this.state}
        refetchQueries={[
          { query: MY_PARAMETERS_QUERY },
          { query: ALL_PARAMETERS_QUERY },
          { query: REVIEW_EXPERIMENT_QUERY, variables: { id: this.props.id } },
        ]}
      >
        {(createParameter, { loading, error }) => {
          console.log('ready', this.state);
          const { parameters } = this.props;
          return (
            <ParameterForm
              onHandleSubmit={e => this.createParameter(e, createParameter)}
              onHandleChange={this.handleChange}
              onHandleParamChange={this.handleParamChange}
              title={this.state.title}
              data={this.state.data}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default ParametersCreateForm;
