import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { PROJECT_QUERY } from './builderWrapper';
import { PROPOSAL_BOARD_QUERY } from '../../Dashboard/Proposal/proposalpage';
import { USER_DASHBOARD_QUERY } from '../../User/index';
import { MY_DEVELOPED_STUDIES_QUERY } from '../../Bank/Studies/developed';

const CREATE_NEW_STUDY = gql`
  mutation CREATE_NEW_STUDY(
    $title: String!
    $description: String!
    $shortDescription: String
    $settings: Json
    $info: Json
    $image: String
    $largeImage: String
    $consent: [ID]
    $components: Json
    $submitForPublishing: Boolean
    $collaborators: [String]
    $classes: [String]
  ) {
    createStudy(
      title: $title
      shortDescription: $shortDescription
      description: $description
      settings: $settings
      info: $info
      image: $image
      largeImage: $largeImage
      consent: $consent
      components: $components
      submitForPublishing: $submitForPublishing
      collaborators: $collaborators
      classes: $classes
    ) {
      id
      slug
      title
      shortDescription
      description
      settings
      info
      image
      largeImage
      consent {
        id
      }
      components
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      submitForPublishing
      classes {
        id
        title
      }
      proposal {
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
    $consent: [ID]
    $components: Json
    $submitForPublishing: Boolean
    $classes: [String]
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
      components: $components
      submitForPublishing: $submitForPublishing
      classes: $classes
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
      public
      submitForPublishing
      classes {
        id
        title
      }
      proposal {
        id
      }
    }
  }
`;

class SaveStudy extends Component {
  render() {
    const {
      study,
      isAuthor,
      adminMode,
      needToClone,
      newStudyFromScratch,
      proposalId,
      updateMyStudy,
      createNewStudy,
      buttonTitle,
      callback,
    } = this.props;

    let refetchQueries = {};
    // refetch proposal query if there is one
    if (proposalId) {
      refetchQueries = [
        {
          query: PROJECT_QUERY,
          variables: { id: study.id },
        },
        {
          query: PROPOSAL_BOARD_QUERY,
          variables: { id: proposalId },
        },
      ];
    } else {
      refetchQueries = [
        {
          query: PROJECT_QUERY,
          variables: { id: study.id },
        },
      ];
    }

    return (
      <>
        {(isAuthor || adminMode) && !needToClone && !newStudyFromScratch ? (
          <Mutation mutation={UPDATE_STUDY} refetchQueries={refetchQueries}>
            {(updateStudy, { loading, error }) => {
              if (error) {
                alert(
                  'Oops! this link has already be taken: please pick another.'
                );
              }
              return (
                <button
                  className="secondaryBtn"
                  onClick={() => {
                    updateMyStudy(updateStudy);
                    if (callback) {
                      callback();
                    }
                  }}
                >
                  {buttonTitle || (loading ? 'Saving' : 'Save')}
                </button>
              );
            }}
          </Mutation>
        ) : (
          <Mutation
            mutation={CREATE_NEW_STUDY}
            refetchQueries={[
              { query: MY_DEVELOPED_STUDIES_QUERY },
              { query: USER_DASHBOARD_QUERY },
            ]}
          >
            {(createStudy, { loading, error }) => (
              <button
                className="secondaryBtn"
                onClick={() => {
                  createNewStudy(createStudy);
                  if (callback) {
                    callback();
                  }
                }}
              >
                {buttonTitle || (loading ? 'Saving' : 'Save your study')}
              </button>
            )}
          </Mutation>
        )}
      </>
    );
  }
}

export default SaveStudy;
