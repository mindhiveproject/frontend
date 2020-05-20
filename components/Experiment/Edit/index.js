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
      shortDescription
      description
      parameters
    }
  }
`;

const UPDATE_EXPERIMENT = gql`
  mutation UPDATE_EXPERIMENT(
    $id: ID!
    $title: String
    $shortDescription: String
    $description: String
    $parameters: Json
  ) {
    updateExperiment(
      id: $id
      title: $title
      shortDescription: $shortDescription
      description: $description
      parameters: $parameters
    ) {
      id
      title
      shortDescription
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
          return (
            <OriginalExperimentForm
              parameters={data.experiment.parameters}
              title={data.experiment.title}
              shortDescription={data.experiment.shortDescription}
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
    shortDescription: this.props.shortDescription,
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

  handleParamChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (classType === 'array') {
      val = JSON.stringify(val.split('\n'));
    }
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
              <label htmlFor="shortDescription">
                Short description
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Short description"
                  value={this.state.shortDescription}
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
                ({ name, value, type, help, example, options, array }) => (
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
                      <option value="select">Select one</option>
                      <option value="vas">Visual scale</option>
                      <option value="survey">Survey builder</option>
                      <option value="array">Provide array</option>
                    </select>

                    {type !== 'array' && (
                      <>
                        <div>Options</div>
                        <textarea
                          name={name}
                          value={options}
                          onChange={this.handleParamChange}
                          className="options"
                        />

                        <div>Value</div>
                        <textarea
                          name={name}
                          value={value}
                          onChange={this.handleParamChange}
                          className="value"
                        />
                      </>
                    )}

                    {type === 'array' && (
                      <>
                        <div>Array values</div>
                        <textarea
                          name={name}
                          value={parseIt(value)}
                          onChange={e => this.handleParamChange(e, 'array')}
                          className="value"
                        />
                      </>
                    )}

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

function parseIt(body) {
  try {
    const res = JSON.parse(body);
    return res.join('\n');
  } catch (e) {
    return body;
  }
}

export default UpdateExperiment;
export { UPDATE_EXPERIMENT };