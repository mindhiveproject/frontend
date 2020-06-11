import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';
import Router from 'next/router';
// import { MY_TASKS_QUERY } from '../../Experiments/Custom/my';
// import { ALL_TASKS_QUERY } from '../../Experiments/Custom/index';
// import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';

import Error from '../../ErrorMessage/index';
import TaskForm from './taskForm';

const CREATE_TASK = gql`
  mutation CREATE_TASK(
    $title: String!
    $templateId: ID!
    $description: String
    $parameters: Json
    $settings: Json
  ) {
    createTask(
      title: $title
      templateId: $templateId
      description: $description
      parameters: $parameters
      settings: $settings
    ) {
      id
      title
    }
  }
`;

class CreateTaskForm extends Component {
  state = {
    title: this.props.template.title,
    parameters: this.props.template.parameters,
    templateId: this.props.template.id,
    settings: {},
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
      parameters: this.state.parameters.map(el =>
        el.name === name ? { ...el, value: val } : el
      ),
    });
  };

  createTask = async (e, createTaskMutation) => {
    e.preventDefault();
    const res = await createTaskMutation({
      variables: {
        ...this.state,
      },
    });
    // change the page
    Router.push({
      pathname: '/tasks/my',
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_TASK}
        variables={this.state}
        refetchQueries={
          [
            // { query: MY_TASKS_QUERY },
            // { query: ALL_TASKS_QUERY },
            // { query: REVIEW_EXPERIMENT_QUERY, variables: { id: this.props.id } },
          ]
        }
      >
        {(createTask, { loading, error }) => (
          <TaskForm
            onHandleSubmit={e => this.createTask(e, createTask)}
            onHandleChange={this.handleChange}
            onHandleParamChange={this.handleParamChange}
            title={this.state.title}
            parameters={this.state.parameters}
            loading={loading}
            template={this.props.template}
          />
        )}
      </Mutation>
    );
  }
}

export default CreateTaskForm;
