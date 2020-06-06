import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';

import assemble from './assemble/index';

const CREATE_NEW_EXPERIMENT = gql`
  mutation CREATE_NEW_EXPERIMENT(
    $title: String!
    $shortDescription: String!
    $description: String!
    $image: String
    $largeImage: String
    $parameters: Json
    $script: String
    $style: String
  ) {
    createExperiment(
      title: $title
      shortDescription: $shortDescription
      description: $description
      image: $image
      largeImage: $largeImage
      parameters: $parameters
      script: $script
      style: $style
    ) {
      id
    }
  }
`;

class AddExperiment extends Component {
  state = {
    title: '',
    description: '',
    shortDescription: '',
    image: 'Test image',
    largeImage: 'Test large image',
    parameters: [],
    script: '',
    style: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  handleJSONFileChange = async e => {
    const fileReader = new FileReader();
    const fileName =
      e.target.files[0].name && e.target.files[0].name.split('.')[0];
    fileReader.onload = async fileLoadedEvent => {
      const file = JSON.parse(fileLoadedEvent.target.result);
      const result = await assemble(file, fileName);
      console.log('result', result);
      const script = result.files['script.js'].content;
      this.setState({
        script,
        style: result.files['style.css'].content,
        file,
      });
    };
    fileReader.readAsText(e.target.files[0]);
  };

  render() {
    return (
      <Mutation mutation={CREATE_NEW_EXPERIMENT} variables={this.state}>
        {(createExperiment, { loading, error }) => (
          <SignForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createExperiment();
              // change the page
              Router.push({
                pathname: '/exp',
                query: { id: res.data.createExperiment.id },
              });
            }}
          >
            <h2>Add an experiment</h2>
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
              <label htmlFor="script">
                JSON file
                <input
                  type="file"
                  id="script"
                  name="script"
                  onChange={this.handleJSONFileChange}
                  accept=".json"
                  required
                />
              </label>

              <h2>Add parameters</h2>

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

              <button type="submit">Save</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default AddExperiment;
export { CREATE_NEW_EXPERIMENT };
