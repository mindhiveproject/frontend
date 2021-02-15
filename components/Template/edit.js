import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';
import { StyledParameterBlock } from './styles';
import lz from "lzutf8";

import assemble from '../AddExperiment/assembleDev/index';

const SINGLE_TEMPLATE_QUERY = gql`
  query SINGLE_TEMPLATE_QUERY($id: ID!) {
    template(where: { id: $id }) {
      id
      title
      shortDescription
      description
      parameters
    }
  }
`;

const UPDATE_TEMPLATE = gql`
  mutation UPDATE_TEMPLATE(
    $id: ID!
    $title: String
    $shortDescription: String
    $description: String
    $parameters: Json
    $script: String
    $style: String
  ) {
    updateTemplate(
      id: $id
      title: $title
      shortDescription: $shortDescription
      description: $description
      parameters: $parameters
      script: $script
      style: $style
    ) {
      id
      title
      shortDescription
      description
      parameters
    }
  }
`;

class UpdateTemplate extends Component {
  render() {
    return (
      <Query query={SINGLE_TEMPLATE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.template)
            return <p>No template found for id {this.props.id}</p>;
          return (
            <OriginalTemplateForm
              parameters={data.template.parameters}
              title={data.template.title}
              shortDescription={data.template.shortDescription}
              description={data.template.description}
              id={this.props.id}
            />
          );
        }}
      </Query>
    );
  }
}

class OriginalTemplateForm extends Component {
  state = {
    title: this.props.title,
    shortDescription: this.props.shortDescription,
    description: this.props.description,
    parameters: this.props.parameters,
    script: this.props.script,
    style: this.props.style,
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
      const script = result.files['script.js'].content;
      const compressedString = lz.encodeBase64(lz.compress(script));
      console.log('compressedString', compressedString);
      this.setState({
        script: compressedString,
        style: result.files['style.css'].content,
        file,
      });
    };
    fileReader.readAsText(e.target.files[0]);
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

  updateTemplate = async (e, updateTemplateMutation) => {
    e.preventDefault();
    const res = await updateTemplateMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    Router.push({
      pathname: '/templates/page',
      query: { id: res.data.updateTemplate.id },
    });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_TEMPLATE} variables={this.state}>
        {(updateTemplate, { loading, error }) => (
          <SignForm onSubmit={e => this.updateTemplate(e, updateTemplate)}>
            <h2>Edit the template</h2>
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

export default UpdateTemplate;
export { UPDATE_TEMPLATE };
