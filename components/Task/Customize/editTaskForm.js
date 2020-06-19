import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

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
    $description: String
    $parameters: Json
    $settings: Json
    $link: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      parameters: $parameters
      settings: $settings
      link: $link
    ) {
      id
      title
    }
  }
`;

class EditTaskForm extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    link: this.props.link,
    parameters: this.props.parameters || [],
    templateId: this.props.template && this.props.template.id,
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
      parameters: this.state.parameters.map(el =>
        el.name === name ? { ...el, value: val } : el
      ),
    });
  };

  updateTask = async (e, updateTaskMutation) => {
    e.preventDefault();
    console.log('updating parameters', this.state, this.props.id);
    const res = await updateTaskMutation({
      variables: {
        id: this.props.id,
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
          // console.log('ready parameters', title, parameters);
          return (
            <TaskForm
              onHandleSubmit={e => this.updateTask(e, updateTask)}
              onHandleChange={this.handleChange}
              onHandleParamChange={this.handleParamChange}
              title={this.state.title}
              description={this.state.description}
              link={this.state.link}
              parameters={this.state.parameters}
              loading={loading}
              template={this.props.template}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default EditTaskForm;
