import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

import gql from 'graphql-tag';
import Router from 'next/router';
// import { REVIEW_EXPERIMENT_QUERY } from '../Review/index';
// import { CUSTOM_TASK_QUERY } from '../CustomRun/index';
import TaskForm from './taskForm';
import Error from '../../ErrorMessage/index';

import { TASK_QUERY } from './edit';

const UPDATE_TASK = gql`
  mutation UPDATE_TASK(
    $id: ID!
    $title: String
    $slug: String
    $description: String
    $parameters: Json
    $settings: Json
    $link: String
    $collaborators: [String]
    $consent: ID
  ) {
    updateTask(
      id: $id
      title: $title
      slug: $slug
      description: $description
      parameters: $parameters
      settings: $settings
      link: $link
      collaborators: $collaborators
      consent: $consent
    ) {
      id
      title
    }
  }
`;

class EditTaskForm extends Component {
  state = {
    title: this.props.title,
    slug: this.props.slug,
    description: this.props.description,
    link: this.props.link,
    parameters: this.props.parameters || [],
    templateId: this.props.template && this.props.template.id,
    settings: this.props.settings,
    collaborators: (this.props.collaborators &&
      this.props.collaborators.map(c => c.username).length &&
      this.props.collaborators.map(c => c.username)) || [''],
    consent: this.props.consent,
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

  updateTask = async (e, updateTaskMutation) => {
    e.preventDefault();
    const res = await updateTaskMutation({
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
        mutation={UPDATE_TASK}
        variables={this.state}
        refetchQueries={[
          { query: TASK_QUERY, variables: { id: this.props.id } },
          // { query: REVIEW_EXPERIMENT_QUERY, variables: { id: this.props.id } },
          // { query: CUSTOM_TASK_QUERY, variables: { id: this.props.id } },
        ]}
      >
        {(updateTask, { loading, error }) => {
          const { parameters, title } = this.props;
          return (
            <TaskForm
              onHandleSubmit={e => this.updateTask(e, updateTask)}
              onHandleChange={this.handleChange}
              onHandleParamChange={this.handleParamChange}
              title={this.state.title}
              slug={this.state.slug}
              description={this.state.description}
              link={this.state.link}
              parameters={this.state.parameters}
              loading={loading}
              template={this.props.template}
              collaborators={this.state.collaborators}
              onCollaboratorsChange={this.handleCollaboratorsChange}
              settings={this.state.settings}
              onHandleSettingsChange={this.handleSettingsChange}
              consent={this.state.consent}
              allowEditSlug
            />
          );
        }}
      </Mutation>
    );
  }
}

export default EditTaskForm;
