import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';
import Router from 'next/router';
import { MY_TASKS_QUERY } from '../Board/my';
import { ALL_TASKS_QUERY } from '../Board/all';
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
    $collaborators: [String]
    $consent: ID
  ) {
    createTask(
      title: $title
      templateId: $templateId
      description: $description
      parameters: $parameters
      settings: $settings
      collaborators: $collaborators
      consent: $consent
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
    settings: {
      duration: '',
      descriptionBefore: '',
      descriptionAfter: '',
    },
    collaborators: (this.props.collaborators &&
      this.props.collaborators.map(c => c.username).length &&
      this.props.collaborators.map(c => c.username)) || [''],
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
      pathname: '/task/my',
    });
  };

  handleCollaboratorsChange = e => {
    const { name, value } = e.target;
    const collaborators = [...this.state.collaborators];
    collaborators[name] = value;
    if (name == collaborators.length - 1) {
      collaborators.push('');
    }
    this.setState({
      collaborators,
    });
  };

  handleSettingsChange = e => {
    const { name } = e.target;
    const { value } = e.target;
    const settings = { ...this.state.settings };
    settings[name] = value;
    this.setState({
      settings,
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_TASK}
        variables={this.state}
        refetchQueries={[{ query: MY_TASKS_QUERY }, { query: ALL_TASKS_QUERY }]}
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
            collaborators={this.state.collaborators}
            onCollaboratorsChange={this.handleCollaboratorsChange}
            settings={this.state.settings}
            onHandleSettingsChange={this.handleSettingsChange}
            consent={this.state.consent}
          />
        )}
      </Mutation>
    );
  }
}

export default CreateTaskForm;
export { CREATE_TASK };
