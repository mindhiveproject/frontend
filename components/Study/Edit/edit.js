import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { StyledParameterBlock } from '../styles';
import EditStudyForm from './form';
import { ContainerOnlyForAuthorizedCollaborators } from '../../Permissions/Collaborator/index';

const SINGLE_STUDY_QUERY = gql`
  query SINGLE_STUDY_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      slug
      shortDescription
      description
      settings
      image
      largeImage
      info
      author {
        id
      }
      collaborators {
        id
        username
      }
      consent {
        id
      }
    }
  }
`;

const UPDATE_STUDY = gql`
  mutation UPDATE_STUDY(
    $id: ID!
    $title: String
    $slug: String
    $shortDescription: String
    $description: String
    $settings: Json
    $info: Json
    $image: String
    $largeImage: String
    $collaborators: [String]
    $consent: ID
  ) {
    updateStudy(
      id: $id
      title: $title
      slug: $slug
      shortDescription: $shortDescription
      description: $description
      settings: $settings
      info: $info
      image: $image
      largeImage: $largeImage
      collaborators: $collaborators
      consent: $consent
    ) {
      id
      slug
      title
      shortDescription
      description
      settings
      image
      largeImage
      consent {
        id
      }
    }
  }
`;

class UpdateStudy extends Component {
  update = async (e, state, updateStudyMutation) => {
    e.preventDefault();
    const res = await updateStudyMutation({
      variables: {
        id: this.props.id,
        ...state,
      },
    });
    Router.push('/studies/[slug]', `/studies/${res.data.updateStudy.slug}`);
  };

  render() {
    return (
      <Query query={SINGLE_STUDY_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.study)
            return <p>No study found for id {this.props.id}</p>;
          return (
            <ContainerOnlyForAuthorizedCollaborators
              ids={
                data.study.collaborators &&
                data.study.collaborators.map(c => c.id)
              }
              id={data.study.author && data.study.author.id}
            >
              <Mutation
                mutation={UPDATE_STUDY}
                refetchQueries={[
                  {
                    query: REVIEW_STUDY_QUERY,
                    variables: { slug: data.study.slug },
                  },
                ]}
              >
                {(updateStudy, { loading, error }) => (
                  <EditStudyForm
                    title="Edit the study"
                    error={error}
                    loading={loading}
                    study={data.study}
                    onSubmit={this.update}
                    callback={updateStudy}
                    consent={data.study.consent?.id}
                    allowEditSlug
                  />
                )}
              </Mutation>
            </ContainerOnlyForAuthorizedCollaborators>
          );
        }}
      </Query>
    );
  }
}

export default UpdateStudy;
export { UPDATE_STUDY };
