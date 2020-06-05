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
        parameters: result.files.parameters,
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
              <button type="submit">Submit</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default AddExperiment;
export { CREATE_NEW_EXPERIMENT };
