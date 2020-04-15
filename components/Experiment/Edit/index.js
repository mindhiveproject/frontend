import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { StyledParameterBlock } from './styles';

const SINGLE_EXPERIMENT_QUERY = gql`
  query SINGLE_EXPERIMENT_QUERY($id: ID!) {
    experiment(where: { id: $id }) {
      id
      title
      description
      parameters
    }
  }
`;

const UPDATE_EXPERIMENT = gql`
  mutation UPDATE_EXPERIMENT(
    $id: ID!
    $title: String
    $description: String
    $parameters: Json
  ) {
    updateExperiment(
      id: $id
      title: $title
      description: $description
      parameters: $parameters
    ) {
      id
      title
      description
      parameters
    }
  }
`;

class UpdateExperiment extends Component {
  render() {
    return (
      <Query query={SINGLE_EXPERIMENT_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.experiment)
            return <p>No experiment found for id {this.props.id}</p>;
          console.log('data.experiment', data.experiment);
          return (
            <OriginalExperimentForm
              parameters={data.experiment.parameters}
              title={data.experiment.title}
              description={data.experiment.description}
              id={this.props.id}
            />
          );
        }}
      </Query>
    );
  }
}

class OriginalExperimentForm extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    parameters: this.props.parameters,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  handleParamChange = e => {
    const { name, type, value, className } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      parameters: this.state.parameters.map(el =>
        el.name === name ? { ...el, [className]: val } : el
      ),
    });
  };

  handleAddNewParameter = e => {
    e.preventDefault();
    const name = document.querySelector('#newParameterName').value;
    if (name) {
      this.setState({
        parameters: [...this.state.parameters, { name }],
      });
    }
  };

  deleteParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      parameters: this.state.parameters.filter(el => el.name !== name),
    });
  };

  updateExperiment = async (e, updateExperimentMutation) => {
    e.preventDefault();
    const res = await updateExperimentMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_EXPERIMENT} variables={this.state}>
        {(updateExperiment, { loading, error }) => (
          <SignForm onSubmit={e => this.updateExperiment(e, updateExperiment)}>
            <h2>Edit the experiment</h2>
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
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <h2>Edit original parameters</h2>

              <div>
                <input type="text" id="newParameterName" />
                <button onClick={this.handleAddNewParameter}>
                  add new parameter
                </button>
              </div>

              {this.state.parameters.map(
                ({ name, value, type, help, example }) => (
                  <StyledParameterBlock key={name} htmlFor={name}>
                    <div className="name">{name}</div>

                    <div>Help</div>
                    <textarea
                      name={name}
                      value={help}
                      onChange={this.handleParamChange}
                      required
                      className="help"
                    />

                    <div>Example</div>
                    <textarea
                      name={name}
                      value={example}
                      onChange={this.handleParamChange}
                      className="example"
                    />

                    <div>Type</div>
                    <select
                      type="text"
                      name={name}
                      value={type}
                      onChange={this.handleParamChange}
                      className="type"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="textarea">Textarea</option>
                    </select>

                    <div>Value</div>
                    <textarea
                      name={name}
                      value={value}
                      onChange={this.handleParamChange}
                      required
                      className="value"
                    />

                    <button onClick={e => this.deleteParameter(e, name)}>
                      Delete
                    </button>
                  </StyledParameterBlock>
                )
              )}

              <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default UpdateExperiment;
export { UPDATE_EXPERIMENT };
