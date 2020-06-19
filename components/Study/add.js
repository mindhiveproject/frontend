import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';
import { StyledParameterBlock } from './styles';
import { MY_STUDIES_QUERY } from './My/index';

const CREATE_NEW_STUDY = gql`
  mutation CREATE_NEW_STUDY(
    $title: String!
    $shortDescription: String!
    $description: String!
    $settings: Json
    $info: Json
    $image: String
    $largeImage: String
  ) {
    createStudy(
      title: $title
      shortDescription: $shortDescription
      description: $description
      settings: $settings
      info: $info
      image: $image
      largeImage: $largeImage
    ) {
      id
      slug
    }
  }
`;

class AddStudy extends Component {
  state = {
    title: '',
    description: '',
    shortDescription: '',
    settings: {},
    image: '',
    largeImage: '',
    info: [],
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'studies');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive-science/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  uploadFileForInfo = async e => {
    const { files, name, className } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'studies');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive-science/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    this.setState({
      info: this.state.info.map(el =>
        el.name === name ? { ...el, [className]: file.secure_url } : el
      ),
    });
  };

  handleInfoChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    console.log('name, type, value, className', name, type, value, className);
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      info: this.state.info.map(el =>
        el.name === name ? { ...el, [className]: val } : el
      ),
    });
  };

  handleAddNewParameter = e => {
    e.preventDefault();
    const name = document.querySelector('#newParameterName').value;
    if (name) {
      this.setState({
        info: [...this.state.info, { name }],
      });
    }
  };

  deleteParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      info: this.state.info.filter(el => el.name !== name),
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_NEW_STUDY}
        variables={this.state}
        refetchQueries={[{ query: MY_STUDIES_QUERY }]}
      >
        {(createStudy, { loading, error }) => (
          <SignForm
            onSubmit={async e => {
              e.preventDefault();
              const res = await createStudy();
              // change the page
              Router.push({
                pathname: `/study/${res.data.createStudy.slug}`,
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

              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  value={this.state.file}
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload preview"
                  />
                )}
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

              <h2>Provide information about the study</h2>

              <div>
                <input type="text" id="newParameterName" />
                <button onClick={this.handleAddNewParameter}>
                  Add new information block
                </button>
              </div>

              {this.state.info.map(({ text, file, name }) => (
                <StyledParameterBlock key={name} htmlFor={name}>
                  <div className="name">{name}</div>

                  <div>Text</div>
                  <textarea
                    name={name}
                    value={text}
                    onChange={this.handleInfoChange}
                    className="text"
                  />

                  <label htmlFor="file">
                    Image
                    <input
                      type="file"
                      name={name}
                      placeholder="Upload an image"
                      onChange={this.uploadFileForInfo}
                      className="file"
                    />
                  </label>

                  <button onClick={e => this.deleteParameter(e, name)}>
                    Delete
                  </button>
                </StyledParameterBlock>
              ))}
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
