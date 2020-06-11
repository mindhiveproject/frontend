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
  ) {
    updateStudy(
      id: $id
      title: $title
      shortDescription: $shortDescription
      description: $description
      settings: $settings
    ) {
      id
      title
      shortDescription
      description
      settings
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
          return (
            <OriginalStudyForm
              settings={data.study.settings}
              title={data.study.title}
              shortDescription={data.study.shortDescription}
              description={data.study.description}
              id={this.props.id}
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
      pathname: '/studies/page',
      query: { id: res.data.updateStudy.id },
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
