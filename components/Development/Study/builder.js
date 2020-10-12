import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import slugify from 'slugify';

import EditPane from './editPane';
import PreviewPane from './previewPane';
import SelectorPane from './componentSelector';
import TaskBuilderWrapper from '../Component/builderWrapper';

import { USER_DASHBOARD_QUERY } from '../../User/index';
import { MY_DEVELOPED_STUDIES_QUERY } from '../../Bank/Studies/developed';
import { STUDY_QUERY } from './builderWrapper';

import {
  StyledBuilder,
  BuilderNav,
  StyledEditPane,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

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

const makeSlug = title => {
  const slug = slugify(title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });
  return slug;
};

class StudyBuilder extends Component {
  state = {
    study: { ...this.props.study },
    isTaskSelectorOpen: false,
    isTaskBuilderOpen: false,
    needToClone: this.props.needToClone,
  };

  handleStudyChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
  };

  handleSetState = (name, value) => {
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
  };

  handleSetMultipleValuesInState = values => {
    this.setState({
      study: {
        ...this.state.study,
        ...values,
      },
    });
  };

  handleParameterChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    const currentInfo = this.state.study.info;
    if (currentInfo.filter(el => el.name === name).length === 0) {
      currentInfo.push({ name });
    }
    const info = currentInfo.map(el =>
      el.name === name ? { ...el, [className]: val } : el
    );
    this.setState({
      study: {
        ...this.state.study,
        info,
      },
    });
  };

  deleteParameter = name => {
    const info = this.state.study.info.filter(p => p.name !== name);
    this.setState({
      study: {
        ...this.state.study,
        info,
      },
    });
  };

  handleSettingsChange = e => {
    const { name } = e.target;
    const value = e.target.checked;
    const settings = { ...this.state.study.settings };
    settings[name] = value;
    this.setState({
      study: {
        ...this.state.study,
        settings,
      },
    });
  };

  handleCollaboratorsChange = e => {
    const { name, value } = e.target;
    const collaborators = [...this.state.study.collaborators];
    collaborators[name] = value;
    if (name == collaborators.length - 1) {
      collaborators.push('');
    }
    this.setState({
      study: {
        ...this.state.study,
        collaborators,
      },
    });
  };

  uploadImage = async e => {
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
      study: {
        ...this.state.study,
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
      },
    });
  };

  toggleTaskSelector = newState => {
    this.setState({
      isTaskSelectorOpen: newState,
    });
  };

  addComponent = component => {
    const components = this.state.study.components || [];
    this.setState({
      study: {
        ...this.state.study,
        components: [...components, component],
      },
    });
  };

  removeComponent = (component, num) => {
    const components = this.state.study.components || [];
    components.splice(num, 1);
    this.setState({
      study: {
        ...this.state.study,
        components: [...components],
      },
    });
  };

  createNewStudy = async createStudyMutation => {
    const res = await createStudyMutation({
      variables: {
        ...this.state.study,
      },
    });
    const myStudy = res.data.createStudy;
    this.setState({
      needToClone: false,
      study: {
        ...myStudy,
        consent: myStudy.consent?.id,
        collaborators: (myStudy.collaborators &&
          myStudy.collaborators.map(c => c.username).length &&
          myStudy.collaborators.map(c => c.username)) || [''],
      },
    });
  };

  updateMyStudy = async updateStudyMutation => {
    const res = await updateStudyMutation({
      variables: {
        ...this.state.study,
      },
    });
  };

  openTaskEditor = componentId => {
    this.setState({
      isTaskBuilderOpen: true,
      componentId,
    });
  };

  onTaskBuilderLeave = () => {
    this.setState({
      isTaskBuilderOpen: false,
      componentId: null,
    });
  };

  render() {
    const { user } = this.props;
    const { study, needToClone } = this.state;
    const isAuthor =
      user.id === this.props.study?.author?.id ||
      this.props.study?.collaborators.includes(user.username);

    return (
      <>
        {this.state.isTaskBuilderOpen ? (
          <TaskBuilderWrapper
            onLeave={this.onTaskBuilderLeave}
            componentId={this.state.componentId}
            user={this.props.user}
          />
        ) : (
          <StyledBuilderPage>
            <BuilderNav>
              <div className="goBackBtn" onClick={this.props.onLeave}>
                ← Leave Study Builder
              </div>
              <div>
                <p>{this.state.study.title}</p>
              </div>
              {isAuthor && !needToClone ? (
                <div className="saveBtn">
                  <Mutation
                    mutation={UPDATE_STUDY}
                    refetchQueries={[
                      {
                        query: STUDY_QUERY,
                        variables: { id: this.state.study.id },
                      },
                    ]}
                  >
                    {(updateStudy, { loading, error }) => (
                      <div>
                        <button
                          className="secondaryBtn"
                          onClick={() => {
                            this.updateMyStudy(updateStudy);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
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
                            this.createNewStudy(createStudy);
                          }}
                        >
                          Create new study
                        </button>
                      </div>
                    )}
                  </Mutation>
                </div>
              )}
            </BuilderNav>

            <StyledBuilder>
              {!this.state.isTaskSelectorOpen && (
                <EditPane
                  handleStudyChange={this.handleStudyChange}
                  handleParameterChange={this.handleParameterChange}
                  handleSettingsChange={this.handleSettingsChange}
                  handleCollaboratorsChange={this.handleCollaboratorsChange}
                  handleSetState={this.handleSetState}
                  study={this.state.study}
                />
              )}
              {this.state.isTaskSelectorOpen && (
                <SelectorPane
                  onAddComponent={this.addComponent}
                  toggleTaskSelector={this.toggleTaskSelector}
                  user={this.props.user}
                  openTaskEditor={this.openTaskEditor}
                />
              )}

              <StyledPreviewPane>
                <PreviewPane
                  study={this.state.study}
                  handleStudyChange={this.handleStudyChange}
                  handleSetMultipleValuesInState={
                    this.handleSetMultipleValuesInState
                  }
                  uploadImage={this.uploadImage}
                  handleParameterChange={this.handleParameterChange}
                  deleteParameter={this.deleteParameter}
                  toggleTaskSelector={this.toggleTaskSelector}
                  onRemoveComponent={this.removeComponent}
                  openTaskEditor={this.openTaskEditor}
                />
              </StyledPreviewPane>
            </StyledBuilder>
          </StyledBuilderPage>
        )}
      </>
    );
  }
}

export default StudyBuilder;
