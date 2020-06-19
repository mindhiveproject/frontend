import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../Styles/Forms';
import Error from '../ErrorMessage/index';
import { StyledParameterBlock } from './styles';

import assemble from '../AddExperiment/assemble/index';

const SINGLE_STUDY_QUERY = gql`
  query SINGLE_STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      shortDescription
      description
      settings
      image
      largeImage
      info
    }
  }
`;

const UPDATE_STUDY = gql`
  mutation UPDATE_STUDY(
    $id: ID!
    $title: String
    $shortDescription: String
    $description: String
    $settings: Json
    $info: Json
    $image: String
    $largeImage: String
  ) {
    updateStudy(
      id: $id
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
      title
      shortDescription
      description
      settings
      image
      largeImage
    }
  }
`;

class UpdateStudy extends Component {
  render() {
    return (
      <Query query={SINGLE_STUDY_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.study)
            return <p>No study found for id {this.props.id}</p>;
          console.log('data.study', data.study);
          return (
            <OriginalStudyForm
              settings={data.study.settings}
              title={data.study.title}
              shortDescription={data.study.shortDescription}
              description={data.study.description}
              id={this.props.id}
              image={data.study.image}
              largeImage={data.study.largeImage}
              info={data.study.info}
            />
          );
        }}
      </Query>
    );
  }
}

class OriginalStudyForm extends Component {
  state = {
    title: this.props.title,
    shortDescription: this.props.shortDescription,
    description: this.props.description,
    settings: this.props.settings,
    image: this.props.image,
    largeImage: this.props.largeImage,
    info: this.props.info,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  updateStudy = async (e, updateStudyMutation) => {
    e.preventDefault();
    const res = await updateStudyMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    Router.push({
      pathname: `/study/${res.data.updateStudy.slug}`,
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
      <Mutation mutation={UPDATE_STUDY} variables={this.state}>
        {(updateStudy, { loading, error }) => (
          <SignForm onSubmit={e => this.updateStudy(e, updateStudy)}>
            <h2>Edit the study</h2>
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

              <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
            </fieldset>
          </SignForm>
        )}
      </Mutation>
    );
  }
}

export default UpdateStudy;
export { UPDATE_STUDY };
