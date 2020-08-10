import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import Router from 'next/router';
import TaskForm from '../Customize/taskForm';
import Error from '../../ErrorMessage/index';

import { CREATE_TASK } from '../Customize/createTaskForm';
import { MY_TASKS_QUERY } from '../Board/my';
import { ALL_TASKS_QUERY } from '../Board/all';

class ForkTaskForm extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    link: this.props.link,
    parameters: this.props.parameters || [],
    templateId: this.props.template && this.props.template.id,
    settings: this.props.settings,
    collaborators: [''],
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
    console.log('updating parameters', this.state, this.props.id);
    const res = await createTaskMutation({
      variables: {
        id: this.props.id,
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
        {(createTask, { loading, error }) => {
          const { parameters, title } = this.props;
          return (
            <TaskForm
              onHandleSubmit={e => this.createTask(e, createTask)}
              onHandleChange={this.handleChange}
              onHandleParamChange={this.handleParamChange}
              title={this.state.title}
              description={this.state.description}
              link={this.state.link}
              parameters={this.state.parameters}
              loading={loading}
              template={this.props.template}
              collaborators={this.state.collaborators}
              onCollaboratorsChange={this.handleCollaboratorsChange}
              settings={this.state.settings}
              onHandleSettingsChange={this.handleSettingsChange}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default ForkTaskForm;
