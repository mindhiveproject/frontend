import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';
import { StyledParameterBlock } from './styles';
import assemble from '../AddExperiment/assemble/index';

const CREATE_NEW_STUDY = gql`
  mutation CREATE_NEW_STUDY(
    $title: String!
    $shortDescription: String!
    $description: String!
    $settings: Json
  ) {
    createStudy(
      title: $title
      shortDescription: $shortDescription
      description: $description
      settings: $settings
    ) {
      id
    }
  }
`;

class AddStudy extends Component {
  state = {
    title: '',
    description: '',
    shortDescription: '',
    settings: {},
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
      <Mutation mutation={CREATE_NEW_STUDY} variables={this.state}>
        {(createStudy, { loading, error }) => (
          <SignForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createStudy();
              // change the page
              Router.push({
                pathname: '/studies/page',
                query: { id: res.data.createStudy.id },
              });
            }}
          >
            <h2>Add a new study</h2>
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

              <button type="submit">Save</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default AddStudy;
export { CREATE_NEW_STUDY };
