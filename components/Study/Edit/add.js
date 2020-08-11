import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SignForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { StyledParameterBlock } from '../styles';
import { MY_STUDIES_QUERY } from '../Board/my';
import { ALL_STUDIES_QUERY } from '../Board/all';
import EditStudyForm from './form';

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
  save = async (e, state, createStudyMutation) => {
    e.preventDefault();
    const res = await createStudyMutation({
      variables: {
        ...state,
      },
    });
    Router.push('/studies/[slug]', `/studies/${res.data.createStudy.slug}`);
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_NEW_STUDY}
        refetchQueries={[
          { query: MY_STUDIES_QUERY },
          { query: ALL_STUDIES_QUERY },
        ]}
      >
        {(createStudy, { loading, error }) => (
          <EditStudyForm
            title="Add new study"
            error={error}
            loading={loading}
            study={{}}
            onSubmit={this.save}
            callback={createStudy}
          />
        )}
      </Mutation>
    );
  }
}

export default AddStudy;
export { CREATE_NEW_STUDY };
