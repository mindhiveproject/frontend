import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { Menu } from 'semantic-ui-react';

import { StudyBuilderNav } from '../styles';

import { STUDY_QUERY } from './builderWrapper';
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
    $consent: ID
    $components: Json
    $submitForPublishing: Boolean
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
    $components: Json
    $submitForPublishing: Boolean
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
    }
  }
`;

class Navigation extends Component {
  render() {
    const { section } = this.props;
    return (
      <StudyBuilderNav>
        <div className="goBackBtn" onClick={this.props.onLeave}>
          ← Leave Builder
        </div>
        <div>
          <p>{this.props.study.title}</p>
        </div>

        <Menu text stackable className="discoverMenu">
          <Menu.Item
            name="proposal"
            active={section === 'proposal'}
            onClick={this.props.handleSectionChange}
            className={
              section === 'proposal'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Proposal</p>
          </Menu.Item>

          <Menu.Item
            name="studyBuilder"
            active={section === 'studyBuilder'}
            onClick={this.props.handleSectionChange}
            className={
              section === 'studyBuilder'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Study Builder</p>
          </Menu.Item>

          <Menu.Item
            name="review"
            active={section === 'review'}
            onClick={this.props.handleSectionChange}
            className={
              section === 'review'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Review</p>
          </Menu.Item>

          <Menu.Item
            name="collect"
            active={section === 'collect'}
            onClick={this.props.handleSectionChange}
            className={
              section === 'collect'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Collect</p>
          </Menu.Item>

          <Menu.Item
            name="analyze"
            active={section === 'analyze'}
            onClick={this.props.handleSectionChange}
            className={
              section === 'analyze'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Analyze</p>
          </Menu.Item>
        </Menu>

        <div>
          <button
            onClick={() => {
              this.props.openAddCollaboratorsModal();
            }}
            className="addCollaboratorsButton"
          >
            Add collaborators
          </button>
        </div>

        {!this.props.readOnlyMode && (
          <>
            {this.props.isAuthor && !this.props.needToClone ? (
              <div className="saveBtn">
                <Mutation
                  mutation={UPDATE_STUDY}
                  refetchQueries={[
                    {
                      query: STUDY_QUERY,
                      variables: { id: this.props.study.id },
                    },
                  ]}
                >
                  {(updateStudy, { loading, error }) => {
                    if (error) {
                      alert(
                        'Oops! this link has already be taken: please pick another.'
                      );
                    }
                    return (
                      <div>
                        <button
                          className="secondaryBtn"
                          onClick={() => {
                            this.props.updateMyStudy(updateStudy);
                          }}
                        >
                          {loading ? 'Saving' : 'Save'}
                        </button>
                      </div>
                    );
                  }}
                </Mutation>
              </div>
            ) : (
              <div className="saveBtn">
                <Mutation
                  mutation={CREATE_NEW_STUDY}
                  refetchQueries={[
                    { query: MY_DEVELOPED_STUDIES_QUERY },
                    { query: USER_DASHBOARD_QUERY },
                  ]}
                >
                  {(createStudy, { loading, error }) => (
                    <div>
                      <button
                        className="secondaryBtn"
                        onClick={() => {
                          this.props.createNewStudy(createStudy);
                        }}
                      >
                        {loading ? 'Saving' : 'Save your study'}
                      </button>
                    </div>
                  )}
                </Mutation>
              </div>
            )}
          </>
        )}
      </StudyBuilderNav>
    );
  }
}

export default Navigation;
