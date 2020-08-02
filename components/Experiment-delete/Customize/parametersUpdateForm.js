import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';
import Router from 'next/router';
import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';
import { CUSTOM_PARAMETER_QUERY } from '../CustomRun/index';

import ParameterForm from './parameterForm';
import Error from '../../ErrorMessage/index';

const UPDATE_PARAMETER = gql`
  mutation UPDATE_PARAMETER(
    $id: ID!
    $title: String
    $data: Json
    $settings: Json
  ) {
    updateParameter(id: $id, title: $title, data: $data, settings: $settings) {
      id
      title
    }
  }
`;

class ParametersUpdateForm extends Component {
  state = {
    title: this.props.title,
    data: this.props.parameters,
    id: this.props.id,
    settings: this.props.settings,
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

  updateParameter = async (e, updateParameterMutation) => {
    e.preventDefault();
    console.log('updating parameters', this.state, this.props.id);
    const res = await updateParameterMutation({
      variables: {
        id: this.props.id,
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
        mutation={UPDATE_PARAMETER}
        variables={this.state}
        refetchQueries={[
          { query: REVIEW_EXPERIMENT_QUERY, variables: { id: this.props.id } },
          { query: CUSTOM_PARAMETER_QUERY, variables: { id: this.props.id } },
        ]}
      >
        {(updateParameter, { loading, error }) => {
          const { parameters, title } = this.props;
          // console.log('ready parameters', title, parameters);
          return (
            <ParameterForm
              id={this.props.id}
              onHandleSubmit={e => this.updateParameter(e, updateParameter)}
              onHandleChange={this.handleChange}
              onHandleParamChange={this.handleParamChange}
              title={this.state.title}
              data={this.state.data}
              loading={loading}
              experiment={this.props.experiment}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default ParametersUpdateForm;
