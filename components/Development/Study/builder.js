import React, { Component } from 'react';
import slugify from 'slugify';
import uniqid from 'uniqid';

import TaskBuilderWrapper from '../Component/builderWrapper';

import Navigation from './navigation';
import StudyBuilderSection from './StudyBuilder/index';
import AnalyzeSection from './Analyze/index';
import ProposalSection from './Proposal/index';
import ReviewSection from './Review/index';

import InDev from './inDev';
import {
  StyledBuilder,
  BuilderNav,
  StyledEditPane,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

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
    readOnlyMode: this.props.readOnlyMode,
    section: 'studyBuilder',
  };

  handleSectionChange = (e, { name }) => this.setState({ section: name });

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

  updateComponents = components => {
    this.setState({
      study: {
        ...this.state.study,
        components,
      },
    });
  };

  addComponent = component => {
    let updatedComponents;
    // if there is no components,
    if (this.state.study.components) {
      updatedComponents = { ...this.state.study.components };
    } else {
      updatedComponents = {
        blocks: [],
      };
    }
    // if there are no blocks, create blocks
    if (!updatedComponents.blocks) {
      updatedComponents.blocks = [];
    }
    // if the blocks are empty, create first block
    if (updatedComponents.blocks.length === 0) {
      updatedComponents.blocks.push({
        blockId: uniqid.time(),
        title: 'Main experiment sequence',
        tests: [],
      });
    }

    // add new component to the first block
    updatedComponents.blocks[0].tests.push({
      ...component,
      testId: uniqid.time(),
    });

    // update the state
    this.setState({
      study: {
        ...this.state.study,
        components: updatedComponents,
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
    const { study, needToClone, readOnlyMode } = this.state;
    const isAuthor =
      user.id === study?.author?.id ||
      study?.collaborators.includes(user.username);

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
            <Navigation
              onLeave={this.props.onLeave}
              study={this.state.study}
              readOnlyMode={readOnlyMode}
              isAuthor={isAuthor}
              needToClone={needToClone}
              createNewStudy={this.createNewStudy}
              updateMyStudy={this.updateMyStudy}
              handleSectionChange={this.handleSectionChange}
              section={this.state.section}
            />

            {this.state.section === 'proposal' && (
              <ProposalSection
                study={this.state.study}
                user={this.props.user}
              />
            )}

            {this.state.section === 'studyBuilder' && (
              <StudyBuilderSection
                isTaskSelectorOpen={this.state.isTaskSelectorOpen}
                handleStudyChange={this.handleStudyChange}
                handleParameterChange={this.handleParameterChange}
                handleSettingsChange={this.handleSettingsChange}
                handleCollaboratorsChange={this.handleCollaboratorsChange}
                handleSetState={this.handleSetState}
                study={this.state.study}
                user={this.props.user}
                needToClone={needToClone}
                onAddComponent={this.addComponent}
                toggleTaskSelector={this.toggleTaskSelector}
                openTaskEditor={this.openTaskEditor}
                handleSetMultipleValuesInState={
                  this.handleSetMultipleValuesInState
                }
                uploadImage={this.uploadImage}
                deleteParameter={this.deleteParameter}
                toggleTaskSelector={this.toggleTaskSelector}
                openTaskEditor={this.openTaskEditor}
                needToClone={needToClone}
                updateComponents={this.updateComponents}
              />
            )}
            {this.state.section === 'review' && (
              <ReviewSection study={this.state.study} user={this.props.user} />
            )}

            {this.state.section === 'collect' && <InDev />}

            {this.state.section === 'analyze' && (
              <AnalyzeSection studyId={this.state.study.id} />
            )}
          </StyledBuilderPage>
        )}
      </>
    );
  }
}

export default StudyBuilder;
