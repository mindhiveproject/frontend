import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { MY_TASKS_QUERY } from '../Board/my';
import { ALL_TASKS_QUERY } from '../Board/all';

const CREATE_EXTERNAL_TASK = gql`
  mutation CREATE_EXTERNAL_TASK(
    $title: String!
    $description: String
    $settings: Json
    $link: String
  ) {
    createTask(
      title: $title
      description: $description
      settings: $settings
      link: $link
    ) {
      id
      title
    }
  }
`;

class CreateExternalTask extends Component {
  state = {
    title: '',
    description: '',
    settings: {},
    link: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_EXTERNAL_TASK}
        variables={this.state}
        refetchQueries={[{ query: MY_TASKS_QUERY }, { query: ALL_TASKS_QUERY }]}
      >
        {(createTask, { loading, error }) => (
          <SignForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createTask();
              Router.push({
                pathname: '/tasks/my',
              });
            }}
          >
            <h2>Add an external task with the web link</h2>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="link">
                Web link (https://)
                <input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="Web link"
                  value={this.state.link}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Save</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default CreateExternalTask;
