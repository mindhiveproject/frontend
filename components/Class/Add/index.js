import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SimpleStyledForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';

import { MY_CLASSES_QUERY } from '../Board/my';
import { ALL_CLASSES_QUERY } from '../Board/all';

const CREATE_NEW_CLASS = gql`
  mutation CREATE_NEW_CLASS(
    $title: String!
    $description: String
    $image: String
    $largeImage: String
  ) {
    createClass(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class AddClass extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  // method for uploading images
  uploadImage = async e => {
    console.log('uploading image');
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'mindhive');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    console.log('file', file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_NEW_CLASS}
        variables={this.state}
        refetchQueries={[
          { query: MY_CLASSES_QUERY },
          { query: ALL_CLASSES_QUERY },
        ]}
      >
        {(createClass, { loading, error }) => (
          <SimpleStyledForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createClass();
              // change the page
              Router.push({
                pathname: '/class',
                query: { id: res.data.createClass.id },
              });
            }}
          >
            <h2>Add a new class</h2>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="image">
                Select an image for your class
                <input
                  type="file"
                  id="image"
                  name="image"
                  placeholder="Upload an image"
                  onChange={this.uploadImage}
                />
                {this.state.image && (
                  <img
                    src={this.state.image}
                    width="200"
                    alt="Upload preview"
                  />
                )}
              </label>

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
              <button type="submit">Create new class</button>
            </fieldset>
          </SimpleStyledForm>
        )}
      </Mutation>
    );
  }
}

export default AddClass;
